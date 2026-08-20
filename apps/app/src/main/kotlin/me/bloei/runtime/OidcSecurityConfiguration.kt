package me.bloei.runtime

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.Customizer.withDefaults
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration(proxyBeanMethods = false)
@Profile("oidc")
class OidcSecurityConfiguration {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain =
        http
            .authorizeHttpRequests {
                it.requestMatchers("/", "/css/**", "/webjars/**", "/actuator/health/**").permitAll()
                it.anyRequest().authenticated()
            }.headers {
                it.contentSecurityPolicy { policy -> policy.policyDirectives(CONTENT_SECURITY_POLICY) }
            }.oauth2Login(withDefaults())
            .logout { it.logoutSuccessUrl("/") }
            .build()

    companion object {
        const val CONTENT_SECURITY_POLICY =
            "default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; " +
                "form-action 'self'; img-src 'self' data:"
    }
}
