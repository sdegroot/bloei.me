package me.bloei

import org.junit.jupiter.api.Test
import org.springframework.modulith.core.ApplicationModules

class ArchitectureTest {
    @Test
    fun `application modules obey their boundaries`() {
        ApplicationModules.of(BloeiApplication::class.java).verify()
    }
}
