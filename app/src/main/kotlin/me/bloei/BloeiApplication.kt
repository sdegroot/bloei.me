package me.bloei

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.modulith.Modulith

@Modulith
@SpringBootApplication
class BloeiApplication

fun main(args: Array<String>) {
    runApplication<BloeiApplication>(*args)
}
