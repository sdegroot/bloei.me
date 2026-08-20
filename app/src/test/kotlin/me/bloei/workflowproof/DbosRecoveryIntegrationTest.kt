package me.bloei.workflowproof

import dev.dbos.transact.DBOS
import dev.dbos.transact.StartWorkflowOptions
import dev.dbos.transact.execution.ThrowingRunnable
import dev.dbos.transact.spring.txstep.TransactionalStep
import dev.dbos.transact.workflow.Workflow
import me.bloei.BloeiApplication
import org.junit.jupiter.api.Test
import org.springframework.boot.WebApplicationType
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.jdbc.core.JdbcTemplate
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import org.testcontainers.postgresql.PostgreSQLContainer
import java.time.Duration
import java.util.UUID
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@Testcontainers(disabledWithoutDocker = true)
class DbosRecoveryIntegrationTest {
    @Test
    fun `a checkpointed workflow resumes once after application restart`() {
        val proofId = UUID.randomUUID().toString()
        val workflowId = "scaffold-recovery-v1-$proofId"
        val executorId = "scaffold-recovery-${UUID.randomUUID()}"

        startApplication(executorId).use { firstApplication ->
            val jdbc = firstApplication.getBean(JdbcTemplate::class.java)
            jdbc.execute(
                """
                CREATE TABLE IF NOT EXISTS platform.workflow_recovery_proof (
                    workflow_id TEXT PRIMARY KEY,
                    completion_count INTEGER NOT NULL DEFAULT 0
                )
                """.trimIndent(),
            )
            val dbos = firstApplication.getBean(DBOS::class.java)
            val workflow = firstApplication.getBean(RecoveryProofWorkflow::class.java)
            dbos.startWorkflow(
                ThrowingRunnable { workflow.run(proofId, 2_000) },
                StartWorkflowOptions(workflowId),
            )
            eventually(Duration.ofSeconds(5)) {
                jdbc.queryForObject(
                    "SELECT count(*) FROM platform.workflow_recovery_proof WHERE workflow_id = ?",
                    Int::class.java,
                    workflowId,
                ) == 1
            }
            assertEquals(0, completionCount(jdbc, workflowId))
        }

        startApplication(executorId).use { recoveredApplication ->
            val dbos = recoveredApplication.getBean(DBOS::class.java)
            val jdbc = recoveredApplication.getBean(JdbcTemplate::class.java)
            dbos.getResult<Void, Exception>(workflowId)

            assertEquals(1, completionCount(jdbc, workflowId))
            val status = dbos.getWorkflowStatus(workflowId).orElseThrow()
            assertEquals(executorId, status.executorId())
            assertTrue(requireNotNull(status.recoveryAttempts()) >= 1)
        }
    }

    private fun startApplication(executorId: String) =
        SpringApplicationBuilder(BloeiApplication::class.java, WorkflowProofConfiguration::class.java)
            .web(WebApplicationType.NONE)
            .profiles("workflow-proof")
            .run(
                "--spring.datasource.url=${postgres.jdbcUrl}",
                "--spring.datasource.username=${postgres.username}",
                "--spring.datasource.password=${postgres.password}",
                "--dbos.application.version=test",
                "--dbos.executor-id=$executorId",
            )

    private fun completionCount(
        jdbc: JdbcTemplate,
        workflowId: String,
    ): Int =
        requireNotNull(
            jdbc.queryForObject(
                "SELECT completion_count FROM platform.workflow_recovery_proof WHERE workflow_id = ?",
                Int::class.java,
                workflowId,
            ),
        )

    private fun eventually(
        timeout: Duration,
        condition: () -> Boolean,
    ) {
        val deadline = System.nanoTime() + timeout.toNanos()
        while (System.nanoTime() < deadline) {
            if (condition()) return
            Thread.sleep(25)
        }
        assertTrue(condition(), "Condition was not met within $timeout")
    }

    companion object {
        @Container
        @JvmStatic
        val postgres = PostgreSQLContainer("postgres:18.0")
    }
}

@TestConfiguration(proxyBeanMethods = false)
class WorkflowProofConfiguration {
    @Bean
    fun recoveryProofWorkflow(
        dbos: DBOS,
        steps: RecoveryProofSteps,
    ) = RecoveryProofWorkflow(dbos, steps)

    @Bean
    fun recoveryProofSteps(jdbc: JdbcTemplate) = RecoveryProofSteps(jdbc)
}

open class RecoveryProofWorkflow(
    private val dbos: DBOS,
    private val steps: RecoveryProofSteps,
) {
    @Workflow(name = "scaffoldRecoveryProof", maxRecoveryAttempts = 3)
    open fun run(
        proofId: String,
        delayMilliseconds: Long,
    ) {
        val workflowId = "scaffold-recovery-v1-$proofId"
        steps.markStarted(workflowId)
        dbos.sleep(Duration.ofMillis(delayMilliseconds))
        steps.markCompleted(workflowId)
    }
}

open class RecoveryProofSteps(
    private val jdbc: JdbcTemplate,
) {
    @TransactionalStep(name = "scaffoldProofStarted")
    open fun markStarted(workflowId: String) {
        jdbc.update(
            """
            INSERT INTO platform.workflow_recovery_proof (workflow_id)
            VALUES (?)
            ON CONFLICT (workflow_id) DO NOTHING
            """.trimIndent(),
            workflowId,
        )
    }

    @TransactionalStep(name = "scaffoldProofCompleted")
    open fun markCompleted(workflowId: String) {
        jdbc.update(
            """
            UPDATE platform.workflow_recovery_proof
            SET completion_count = completion_count + 1
            WHERE workflow_id = ?
            """.trimIndent(),
            workflowId,
        )
    }
}
