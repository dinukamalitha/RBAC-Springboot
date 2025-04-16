package com.spring_boot_projects.RBAC.controller;

import com.spring_boot_projects.RBAC.dto.ViewRequest;
import com.spring_boot_projects.RBAC.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<ViewRequest>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        return ResponseEntity.ok(userService.forgotPassword(email));
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam String email, @RequestParam String otp) {
        return ResponseEntity.ok(userService.verifyOtp(email, otp));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String email, @RequestParam String password, @RequestParam String confirmPassword) {
        return ResponseEntity.ok(userService.resetPassword(email, password, confirmPassword));
    }
}
