package me.bloei.ui

import me.bloei.runtime.WebConfiguration
import org.hamcrest.Matchers.containsString
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Import
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.security.web.SecurityFilterChain
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@WebMvcTest(HomeController::class)
@ActiveProfiles("test")
@Import(HomeControllerTest.TestSecurityConfiguration::class, WebConfiguration::class)
class HomeControllerTest(
    @Autowired private val mockMvc: MockMvc,
) {
    @TestConfiguration(proxyBeanMethods = false)
    class TestSecurityConfiguration {
        @Bean
        fun testSecurityFilterChain(http: HttpSecurity): SecurityFilterChain =
            http
                .authorizeHttpRequests {
                    it.requestMatchers("/").permitAll()
                    it.anyRequest().authenticated()
                }.build()
    }

    @Test
    fun `home is public`() {
        mockMvc.get("/").andExpect {
            status { isOk() }
            view { name("home") }
            content { string(containsString("Van gedeelde behoefte naar aantoonbaar resultaat.")) }
        }
    }

    @Test
    fun `home can switch to English`() {
        mockMvc
            .get("/") { param("lang", "en") }
            .andExpect {
                status { isOk() }
                content { string(containsString("From shared demand to demonstrable outcomes.")) }
            }
    }

    @Test
    @WithMockUser(username = "alex@example.org")
    fun `workspace renders the authenticated user`() {
        mockMvc.get("/my").andExpect {
            status { isOk() }
            view { name("workspace") }
            model { attribute("principalName", "alex@example.org") }
        }
    }
}
