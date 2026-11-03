package me.bloei.runtime

import me.bloei.ui.HomeController
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Import
import org.springframework.security.oauth2.client.registration.ClientRegistration
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository
import org.springframework.security.oauth2.core.AuthorizationGrantType
import org.springframework.security.oauth2.core.ClientAuthenticationMethod
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestPropertySource
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@WebMvcTest(HomeController::class)
@ActiveProfiles("oidc")
@Import(OidcSecurityConfiguration::class, OidcSecurityTest.ClientRegistrationConfiguration::class)
@TestPropertySource(
    properties = [
        "BLOEI_OIDC_CLIENT_ID=test-client",
        "BLOEI_OIDC_CLIENT_SECRET=test-secret",
        "BLOEI_OIDC_ISSUER_URI=https://issuer.example",
    ],
)
class OidcSecurityTest(
    @Autowired private val mockMvc: MockMvc,
) {
    @Test
    fun `public home does not require authentication`() {
        mockMvc.get("/").andExpect {
            status { isOk() }
            header {
                string(
                    "Content-Security-Policy",
                    OidcSecurityConfiguration.CONTENT_SECURITY_POLICY,
                )
            }
        }
    }

    @Test
    fun `workspace starts the configured OIDC login`() {
        mockMvc.get("/my").andExpect {
            status { is3xxRedirection() }
            redirectedUrl("/oauth2/authorization/bloei")
        }
    }

    @Test
    fun `OIDC subject is available to the authenticated workspace`() {
        mockMvc
            .get("/my") {
                with(oauth2Login().attributes { it["sub"] = "alex@example.org" })
            }.andExpect {
                status { isOk() }
                model { attribute("principalName", "alex@example.org") }
            }
    }

    @TestConfiguration(proxyBeanMethods = false)
    class ClientRegistrationConfiguration {
        @Bean
        fun clientRegistrationRepository(): ClientRegistrationRepository =
            InMemoryClientRegistrationRepository(
                ClientRegistration
                    .withRegistrationId("bloei")
                    .clientId("test-client")
                    .clientSecret("test-secret")
                    .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                    .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                    .redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
                    .scope("openid", "profile", "email")
                    .authorizationUri("https://issuer.example/authorize")
                    .tokenUri("https://issuer.example/token")
                    .jwkSetUri("https://issuer.example/jwks")
                    .userInfoUri("https://issuer.example/userinfo")
                    .userNameAttributeName("sub")
                    .clientName("Bloei.me test issuer")
                    .build(),
            )
    }
}
