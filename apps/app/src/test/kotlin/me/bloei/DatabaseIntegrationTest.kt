package me.bloei

import org.flywaydb.core.Flyway
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.jdbc.Database
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.junit.jupiter.api.Test
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import org.testcontainers.postgresql.PostgreSQLContainer
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

@Testcontainers(disabledWithoutDocker = true)
class DatabaseIntegrationTest {
    @Test
    fun `Flyway and Exposed use PostgreSQL transactions without DAO state`() {
        val flyway =
            Flyway
                .configure()
                .dataSource(postgres.jdbcUrl, postgres.username, postgres.password)
                .createSchemas(true)
                .defaultSchema("platform")
                .schemas("platform", "bloei")
                .locations("classpath:db/migration")
                .load()
        val migration = flyway.migrate()
        assertEquals(1, migration.migrationsExecuted)

        val database = Database.connect(postgres.jdbcUrl, user = postgres.username, password = postgres.password)
        transaction(database) {
            exec(
                """
                CREATE TABLE bloei.exposed_proof (
                    proof_id TEXT PRIMARY KEY,
                    value_text TEXT NOT NULL
                )
                """.trimIndent(),
            )
        }

        val proofId =
            java.util.UUID
                .randomUUID()
                .toString()
        transaction(database) {
            ExposedProof.insert {
                it[id] = proofId
                it[value] = "committed"
            }
        }
        assertEquals(
            listOf("committed"),
            transaction(database) { ExposedProof.selectAll().map { it[ExposedProof.value] } },
        )

        assertFailsWith<IllegalStateException> {
            transaction(database) {
                ExposedProof.insert {
                    it[id] =
                        java.util.UUID
                            .randomUUID()
                            .toString()
                    it[value] = "rolled back"
                }
                error("force rollback")
            }
        }
        assertEquals(1L, transaction(database) { ExposedProof.selectAll().count() })
    }

    private object ExposedProof : Table("bloei.exposed_proof") {
        val id = text("proof_id")
        val value = text("value_text")

        override val primaryKey = PrimaryKey(id)
    }

    companion object {
        @Container
        @JvmStatic
        val postgres = PostgreSQLContainer("postgres:18.0")
    }
}
