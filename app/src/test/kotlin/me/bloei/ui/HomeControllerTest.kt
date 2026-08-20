package me.bloei.ui

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
@Import(HomeControllerTest.TestSecurityConfiguration::class)
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
