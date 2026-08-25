package me.bloei.ui

import com.deque.html.axecore.playwright.AxeBuilder
import com.microsoft.playwright.Browser
import com.microsoft.playwright.BrowserContext
import com.microsoft.playwright.Page
import com.microsoft.playwright.Playwright
import com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat
import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpServer
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.io.TempDir
import java.net.InetAddress
import java.net.InetSocketAddress
import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.writeText
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MockupBrowserTest {
    private lateinit var playwright: Playwright
    private lateinit var browser: Browser
    private lateinit var server: HttpServer
    private lateinit var mockupDirectory: Path
    private lateinit var baseUrl: String

    @BeforeAll
    fun start() {
        mockupDirectory = findRepositoryRoot().resolve("mockup")
        playwright = Playwright.create()
        browser = playwright.chromium().launch()
        server = HttpServer.create(InetSocketAddress(InetAddress.getLoopbackAddress(), 0), 0)
        server.createContext("/") { exchange -> serveMockup(exchange) }
        server.start()
        baseUrl = "http://127.0.0.1:${server.address.port}/"
    }

    @AfterAll
    fun stop() {
        server.stop(0)
        browser.close()
        playwright.close()
    }

    @Test
    fun `direct file journey works offline persists and is accessible`() {
        val requests = mutableListOf<String>()
        val context = browser.newContext(Browser.NewContextOptions().setLocale("en-GB").setOffline(true))
        val page = context.newPage()
        page.onRequest { requests += it.url() }
        page.navigate(mockupDirectory.resolve("index.html").toUri().toString())

        assertThat(page).hasTitle("Bloei.me — Product mockup")
        assertThat(page.locator("h1")).hasText("Move a shared need from idea to accepted result.")
        assertTrue(requests.all { it.startsWith("file:") }, requests.joinToString())
        assertNoAccessibilityViolations(page)

        switchPersona(page, "rivierenstad")
        perform(page, "register")
        switchPersona(page, "operator")
        perform(page, "verify")
        switchPersona(page, "rivierenstad")
        perform(page, "terms")
        perform(page, "budget")
        perform(page, "idea")
        switchPersona(page, "maintainer")
        perform(page, "proposal")
        switchPersona(page, "lead")
        perform(page, "campaign")
        switchPersona(page, "co-supplier")
        perform(page, "coConfirm")
        switchPersona(page, "maintainer")
        perform(page, "publishCampaign")

        switchPersona(page, "rivierenstad")
        perform(page, "pledge")
        switchPersona(page, "waterdam")
        perform(page, "pledge")
        switchPersona(page, "polderland")
        perform(page, "pledge")

        switchPersona(page, "lead")
        perform(page, "delivery")
        switchPersona(page, "rivierenstad")
        perform(page, "accept")
        switchPersona(page, "waterdam")
        perform(page, "accept")
        switchPersona(page, "polderland")
        perform(page, "accept")

        switchPersona(page, "lead")
        repeat(3) { perform(page, "completeNote") }
        openView(page, "campaign")
        assertThat(page.locator(".campaign-hero .status-pill")).hasText("Settled")
        assertThat(page.locator(".facts")).containsText("100%")
        assertThat(page.locator(".facts")).containsText("€82,000")
        assertThat(page.locator(".facts")).containsText("€0")

        page.reload()
        openView(page, "campaign")
        assertThat(page.locator(".campaign-hero .status-pill")).hasText("Settled")
        page.locator("#locale-toggle").click()
        assertThat(page.locator(".primary-nav")).containsText("Campagne")
        assertNoAccessibilityViolations(page)
        context.close()
    }

    @Test
    fun `share links and json snapshots preview before replacing local state`(
        @TempDir temporaryDirectory: Path,
    ) {
        val context = browser.newContext(Browser.NewContextOptions().setLocale("en-GB"))
        val page = context.newPage()
        page.navigate(baseUrl)
        page.evaluate("localStorage.clear()")
        page.reload()

        switchPersona(page, "rivierenstad")
        perform(page, "register")
        openView(page, "share")
        page.locator("[data-share-link]").click()
        val output = page.locator("#share-link")
        output.waitFor()
        val sharedUrl = output.inputValue()
        assertTrue(sharedUrl.startsWith("$baseUrl#share=v1.gzip."), sharedUrl)

        page.evaluate("localStorage.clear()")
        page.navigate(sharedUrl)
        assertThat(page.locator("[data-load-import]")).isVisible()
        assertThat(page.locator("[data-load-import]")).hasText("Load shared journey")
        page.locator("[data-load-import]").click()
        assertThat(page.locator(".progress-copy")).containsText("1 / 9")

        openView(page, "share")
        val download = page.waitForDownload { page.locator("[data-export-json]").click() }
        val exportPath = requireNotNull(download.path())
        page.evaluate("localStorage.clear()")
        page.navigate(baseUrl)
        openView(page, "share")
        page.locator("#import-file").setInputFiles(exportPath)
        assertThat(page.locator("[data-load-import]")).isVisible()
        page.locator("[data-load-import]").click()
        assertThat(page.locator(".progress-copy")).containsText("1 / 9")

        val invalidSnapshot = temporaryDirectory.resolve("invalid.json")
        invalidSnapshot.writeText("{\"product\":\"not-bloei\"}")
        openView(page, "share")
        page.locator("#import-file").setInputFiles(invalidSnapshot)
        assertThat(page.locator("#app .form-error")).hasText("This snapshot is invalid, damaged, or from an unsupported version.")
        openView(page, "overview")
        assertThat(page.locator(".progress-copy")).containsText("1 / 9")
        context.close()
    }

    private fun perform(
        page: Page,
        action: String,
    ) {
        val actionButton = page.locator("[data-action='$action']")
        assertEquals(1, actionButton.count(), "Expected one available $action action")
        actionButton.click()
        val confirmation = page.locator("#action-dialog input[type=checkbox]")
        if (confirmation.count() == 1) {
            confirmation.check()
        }
        page.locator("#dialog-submit").click()
        assertThat(page.locator("#action-dialog")).not().isVisible()
    }

    private fun switchPersona(
        page: Page,
        persona: String,
    ) {
        page.locator("#persona-select").selectOption(persona)
        openView(page, "workspace")
    }

    private fun openView(
        page: Page,
        view: String,
    ) {
        page.locator(".primary-nav [data-view-target='$view']").click()
    }

    private fun assertNoAccessibilityViolations(page: Page) {
        val results = AxeBuilder(page).analyze()
        assertTrue(
            results.violations.isEmpty(),
            results.violations.joinToString("\n") { violation ->
                "${violation.id}: ${violation.help}: ${violation.nodes.joinToString { it.target.toString() }}"
            },
        )
    }

    private fun serveMockup(exchange: HttpExchange) {
        val requested =
            exchange.requestURI.path
                .removePrefix("/")
                .ifEmpty { "index.html" }
        val file = mockupDirectory.resolve(requested).normalize()
        if (!file.startsWith(mockupDirectory) || !Files.isRegularFile(file)) {
            exchange.sendResponseHeaders(404, -1)
            exchange.close()
            return
        }
        exchange.responseHeaders.add(
            "Content-Type",
            when (file.fileName.toString().substringAfterLast('.')) {
                "css" -> "text/css; charset=utf-8"
                "js" -> "text/javascript; charset=utf-8"
                else -> "text/html; charset=utf-8"
            },
        )
        val body = Files.readAllBytes(file)
        exchange.sendResponseHeaders(200, body.size.toLong())
        exchange.responseBody.use { it.write(body) }
    }

    private fun findRepositoryRoot(): Path {
        var directory = Path.of("").toAbsolutePath().normalize()
        while (!Files.isRegularFile(directory.resolve("mockup/index.html"))) {
            directory = requireNotNull(directory.parent) { "Could not find repository root" }
        }
        return directory
    }
}
