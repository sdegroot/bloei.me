plugins {
    alias(libs.plugins.kotlin.spring)
    alias(libs.plugins.spring.dependency.management)
}

dependencyManagement {
    imports {
        mavenBom(org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES)
        mavenBom(
            libs.spring.modulith.bom
                .get()
                .toString(),
        )
        mavenBom(
            libs.exposed.bom
                .get()
                .toString(),
        )
    }
}

dependencies {
    implementation(libs.dbos.spring.boot)
    implementation(libs.dbos.spring.txstep)
    implementation("org.jetbrains.exposed:exposed-core")
    implementation("org.jetbrains.exposed:exposed-jdbc")
    implementation("org.springframework:spring-context")
}
