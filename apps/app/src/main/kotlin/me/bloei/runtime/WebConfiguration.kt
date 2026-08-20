package me.bloei.runtime

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.LocaleResolver
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.i18n.CookieLocaleResolver
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor
import java.util.Locale

@Configuration(proxyBeanMethods = false)
class WebConfiguration : WebMvcConfigurer {
    @Bean
    fun localeResolver(): LocaleResolver =
        CookieLocaleResolver("BLOEI_LOCALE").apply {
            setDefaultLocale(Locale.forLanguageTag("nl-NL"))
        }

    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(LocaleChangeInterceptor().apply { paramName = "lang" })
    }
}
