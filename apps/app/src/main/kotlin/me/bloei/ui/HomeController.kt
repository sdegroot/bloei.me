package me.bloei.ui

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import java.security.Principal

@Controller
class HomeController {
    @GetMapping("/")
    fun home(): String = "home"

    @GetMapping("/my")
    fun workspace(
        principal: Principal,
        model: Model,
    ): String {
        model.addAttribute("principalName", principal.name)
        return "workspace"
    }
}
