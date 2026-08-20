import org.gradle.api.plugins.JavaPluginExtension
import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.dsl.KotlinJvmProjectExtension
import org.jlleitschuh.gradle.ktlint.KtlintExtension

plugins {
    base
    alias(libs.plugins.kotlin.jvm) apply false
    alias(libs.plugins.kotlin.spring) apply false
    alias(libs.plugins.spring.boot) apply false
    alias(libs.plugins.spring.dependency.management) apply false
    alias(libs.plugins.ktlint) apply false
    alias(libs.plugins.kover) apply false
    alias(libs.plugins.cyclonedx) apply false
}

allprojects {
    group = "me.bloei"
    version = "0.1.0-SNAPSHOT"
}

subprojects {
    apply(plugin = "java-library")
    apply(plugin = "org.jetbrains.kotlin.jvm")
    apply(plugin = "org.jlleitschuh.gradle.ktlint")

    extensions.configure<JavaPluginExtension> {
        toolchain {
            languageVersion = JavaLanguageVersion.of(25)
        }
    }

    extensions.configure<KotlinJvmProjectExtension> {
        compilerOptions {
            jvmTarget = JvmTarget.JVM_25
            allWarningsAsErrors = true
            freeCompilerArgs.addAll("-Xjsr305=strict", "-Xannotation-default-target=param-property")
        }
    }

    extensions.configure<KtlintExtension> {
        version = "1.8.0"
    }

    dependencies {
        "testImplementation"(kotlin("test-junit5"))
        "testRuntimeOnly"("org.junit.platform:junit-platform-launcher")
    }

    tasks.withType<Test>().configureEach {
        useJUnitPlatform()
    }

    tasks.named("check") {
        dependsOn("ktlintCheck")
    }
}

tasks.named("check") {
    dependsOn(subprojects.map { "${it.path}:check" })
}

tasks.register("ktlintFormat") {
    group = "formatting"
    description = "Formats Kotlin sources in every module."
    dependsOn(subprojects.map { "${it.path}:ktlintFormat" })
}
