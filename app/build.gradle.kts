plugins {
    alias(libs.plugins.kotlin.spring)
    alias(libs.plugins.spring.boot)
    alias(libs.plugins.spring.dependency.management)
    alias(libs.plugins.kover)
    alias(libs.plugins.cyclonedx)
}

dependencies {
    implementation(project(":core"))
}

tasks.named<org.springframework.boot.gradle.tasks.bundling.BootBuildImage>("bootBuildImage") {
    environment.set(mapOf("BP_JVM_VERSION" to "25"))
}
