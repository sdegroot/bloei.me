plugins {
    alias(libs.plugins.kotlin.spring)
    alias(libs.plugins.spring.boot)
    alias(libs.plugins.spring.dependency.management)
    alias(libs.plugins.kover)
    alias(libs.plugins.cyclonedx)
}

dependencies {
    implementation(project(":modules:core"))
    implementation(platform(libs.spring.modulith.bom))
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-aspectj")
    implementation("org.springframework.boot:spring-boot-starter-flyway")
    implementation("org.springframework.boot:spring-boot-starter-jdbc")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-session-jdbc")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    implementation("org.springframework.modulith:spring-modulith-starter-core")
    implementation("org.flywaydb:flyway-database-postgresql")
    implementation("org.webjars.npm:htmx.org:2.0.10")
    implementation("tools.jackson.module:jackson-module-kotlin")

    runtimeOnly("io.micrometer:micrometer-registry-prometheus")
    runtimeOnly("org.postgresql:postgresql")

    testImplementation("org.springframework.boot:spring-boot-starter-security-test")
    testImplementation("org.springframework.boot:spring-boot-starter-thymeleaf-test")
    testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
    testImplementation("org.springframework.boot:spring-boot-testcontainers")
    testImplementation("org.springframework.modulith:spring-modulith-starter-test")
    testImplementation(platform(libs.exposed.bom))
    testImplementation("org.jetbrains.exposed:exposed-core")
    testImplementation("org.jetbrains.exposed:exposed-jdbc")
    testImplementation(libs.dbos.spring.boot)
    testImplementation(libs.dbos.spring.txstep)
    testImplementation("org.testcontainers:testcontainers-junit-jupiter")
    testImplementation("org.testcontainers:testcontainers-postgresql")
}

val dev =
    sourceSets.create("dev") {
        compileClasspath += sourceSets.main.get().output
        runtimeClasspath += output + compileClasspath
    }

val browserTest =
    sourceSets.create("browserTest") {
        compileClasspath += sourceSets.main.get().output
        runtimeClasspath += output + compileClasspath
    }

configurations.named(dev.implementationConfigurationName) {
    extendsFrom(configurations.implementation.get())
}
configurations.named(dev.runtimeOnlyConfigurationName) {
    extendsFrom(configurations.runtimeOnly.get())
}
configurations.named(browserTest.implementationConfigurationName) {
    extendsFrom(configurations.testImplementation.get())
}
configurations.named(browserTest.runtimeOnlyConfigurationName) {
    extendsFrom(configurations.testRuntimeOnly.get())
}

dependencies {
    add(browserTest.implementationConfigurationName, libs.playwright)
    add(browserTest.implementationConfigurationName, libs.axe.playwright)
}

tasks.register<org.springframework.boot.gradle.tasks.run.BootRun>("bootRunDev") {
    group = "application"
    description = "Runs Bloei.me with the development persona login."
    classpath = dev.runtimeClasspath
    mainClass = "me.bloei.BloeiApplicationKt"
    systemProperty("spring.profiles.active", "dev-personas")
}

tasks.register<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootDevJar") {
    group = "build"
    description = "Builds the explicitly non-production development artifact."
    archiveClassifier = "dev"
    mainClass = "me.bloei.BloeiApplicationKt"
    targetJavaVersion = JavaVersion.VERSION_25
    classpath(dev.runtimeClasspath)
}

tasks.register<JavaExec>("playwrightInstall") {
    group = "verification"
    description = "Installs the Chromium browser used by browserTest."
    classpath = browserTest.runtimeClasspath
    mainClass = "com.microsoft.playwright.CLI"
    args("install", "chromium")
}

tasks.register<JavaExec>("playwrightInstallWithDeps") {
    group = "verification"
    description = "Installs Chromium and its operating-system dependencies for CI."
    classpath = browserTest.runtimeClasspath
    mainClass = "com.microsoft.playwright.CLI"
    args("install", "--with-deps", "chromium")
}

tasks.register<Test>("browserTest") {
    group = "verification"
    description = "Runs browser and automated accessibility tests."
    testClassesDirs = browserTest.output.classesDirs
    classpath = browserTest.runtimeClasspath
    shouldRunAfter(tasks.test)
}

tasks.register("fullCheck") {
    group = "verification"
    description = "Runs the standard checks plus browser verification."
    dependsOn(tasks.check, "browserTest")
}

val verifyProductionArtifact =
    tasks.register("verifyProductionArtifact") {
        group = "verification"
        description = "Verifies that development authentication is absent from the production JAR."
        dependsOn(tasks.bootJar)
        val productionJar = tasks.bootJar.flatMap { it.archiveFile }
        inputs.file(productionJar)
        doLast {
            val forbiddenEntries =
                zipTree(productionJar.get().asFile)
                    .matching {
                        include("**/me/bloei/devauth/**")
                        include("**/application-dev-personas.yml")
                    }.files
            check(forbiddenEntries.isEmpty()) {
                "Production artifact contains development authentication: $forbiddenEntries"
            }
        }
    }

tasks.check {
    dependsOn(verifyProductionArtifact)
}

tasks.named<org.springframework.boot.gradle.tasks.bundling.BootBuildImage>("bootBuildImage") {
    imageName = "bloei-me:${project.version}"
    pullPolicy = org.springframework.boot.buildpack.platform.build.PullPolicy.IF_NOT_PRESENT
    environment.set(mapOf("BP_JVM_VERSION" to "25"))
}
