package me.bloei.ui

import com.deque.html.axecore.playwright.AxeBuilder
import com.microsoft.playwright.Browser
import com.microsoft.playwright.Page
import com.microsoft.playwright.Playwright
import com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat
import com.microsoft.playwright.options.AriaRole
import me.bloei.BloeiApplication
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.web.server.context.WebServerApplicationContext
import org.springframework.context.ConfigurableApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import org.testcontainers.postgresql.PostgreSQLContainer
import kotlin.test.assertTrue

@Testcontainers(disabledWithoutDocker = true)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PublicShellBrowserTest {
    private lateinit var application: ConfigurableApplicationContext
    private lateinit var playwright: Playwright
    private lateinit var browser: Browser
    private lateinit var page: Page
    private lateinit var baseUrl: String

    @BeforeAll
    fun start() {
        application =
            SpringApplicationBuilder(BloeiApplication::class.java, BrowserSecurityConfiguration::class.java)
                .profiles("browser-test")
                .properties("server.port=0")
                .run(
                    "--spring.datasource.url=${postgres.jdbcUrl}",
                    "--spring.datasource.username=${postgres.username}",
                    "--spring.datasource.password=${postgres.password}",
                    "--dbos.application.version=test",
                    "--dbos.executor-id=browser-test",
                )
        val port = requireNotNull((application as WebServerApplicationContext).webServer).port
        baseUrl = "http://127.0.0.1:$port"
        playwright = Playwright.create()
        browser = playwright.chromium().launch()
        page = browser.newPage()
    }

    @AfterAll
    fun stop() {
        page.close()
        browser.close()
        playwright.close()
        application.close()
    }

    @Test
    fun `public shell is responsive keyboard reachable and accessible`() {
        page.setViewportSize(390, 844)
        page.navigate("$baseUrl/?lang=en")

        assertThat(page).hasTitle("Bloei.me")
        assertThat(page.getByRole(AriaRole.HEADING, Page.GetByRoleOptions().setLevel(1)))
            .hasText("From shared demand to demonstrable outcomes.")

        page.keyboard().press("Tab")
        assertThat(page.locator(":focus")).hasAttribute("href", "#content")

        val results = AxeBuilder(page).analyze()
        assertTrue(
            results.violations.isEmpty(),
            results.violations.joinToString("\n") { "${it.id}: ${it.help}" },
        )
    }

    companion object {
        @Container
        @JvmStatic
        val postgres = PostgreSQLContainer("postgres:18.0")
    }
}

@TestConfiguration(proxyBeanMethods = false)
class BrowserSecurityConfiguration {
    @Bean
    fun browserSecurityFilterChain(http: HttpSecurity): SecurityFilterChain =
        http
            .authorizeHttpRequests { it.anyRequest().permitAll() }
            .build()
}
