package me.bloei.devauth

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import me.bloei.runtime.OidcSecurityConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.context.HttpSessionSecurityContextRepository
import org.springframework.security.web.context.SecurityContextRepository
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam

@Configuration(proxyBeanMethods = false)
@Profile("dev-personas")
class DevelopmentSecurityConfiguration {
    @Bean
    fun developmentSecurityFilterChain(http: HttpSecurity): SecurityFilterChain =
        http
            .authorizeHttpRequests {
                it.requestMatchers("/", "/css/**", "/webjars/**", "/dev/**", "/actuator/health/**").permitAll()
                it.anyRequest().authenticated()
            }.headers {
                it.contentSecurityPolicy { policy ->
                    policy.policyDirectives(OidcSecurityConfiguration.CONTENT_SECURITY_POLICY)
                }
            }.formLogin { it.disable() }
            .logout { it.logoutSuccessUrl("/") }
            .build()

    @Bean
    fun securityContextRepository(): SecurityContextRepository = HttpSessionSecurityContextRepository()
}

data class DevelopmentPersona(
    val id: String,
    val name: String,
    val roles: Set<String>,
)

@Controller
@Profile("dev-personas")
class DevelopmentPersonaController(
    private val securityContextRepository: SecurityContextRepository,
) {
    private val personas =
        listOf(
            DevelopmentPersona("municipality-admin", "Alex · Municipality administrator", setOf("ROLE_ORGANIZATION_ADMIN")),
            DevelopmentPersona("funder", "Robin · Funding representative", setOf("ROLE_FUNDING_REPRESENTATIVE")),
            DevelopmentPersona("operator", "Sam · Platform operator", setOf("ROLE_PLATFORM_OPERATOR")),
        )

    @GetMapping("/dev/personas")
    fun chooser(model: Model): String {
        model.addAttribute("personas", personas)
        return "dev/personas"
    }

    @PostMapping("/dev/login")
    fun login(
        @RequestParam persona: String,
        request: HttpServletRequest,
        response: HttpServletResponse,
    ): String {
        val selected = personas.single { it.id == persona }
        val authentication =
            org.springframework.security.authentication.UsernamePasswordAuthenticationToken.authenticated(
                selected.name,
                "N/A",
                selected.roles.map(::SimpleGrantedAuthority),
            )
        val context = SecurityContextHolder.createEmptyContext().apply { this.authentication = authentication }
        SecurityContextHolder.setContext(context)
        securityContextRepository.saveContext(context, request, response)
        return "redirect:/my"
    }
}

@ControllerAdvice
@Profile("dev-personas")
class DevelopmentBannerAdvice {
    @ModelAttribute
    fun developmentMode(model: Model) {
        model.addAttribute("developmentMode", true)
    }
}
