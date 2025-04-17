package com.spring_boot_projects.RBAC.controller;

import com.spring_boot_projects.RBAC.dto.ViewRequest;
import com.spring_boot_projects.RBAC.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/forgot-password/{email}")
    public ResponseEntity<String> forgotPassword(@PathVariable String email) {
        return ResponseEntity.ok(userService.forgotPassword(email));
    }

    @PostMapping("/verify/{email}/{otp}")
    public ResponseEntity<String> verify(@PathVariable String email, @PathVariable String otp) {
        return ResponseEntity.ok(userService.verifyOtp(email, otp));
    }

    @PostMapping("/reset-password/{email}")
    public ResponseEntity<String> resetPassword(@PathVariable String email, @RequestParam String password, @RequestParam String confirmPassword) {
        String response = userService.resetPassword(email, password, confirmPassword);
        return ResponseEntity.ok(response);
    }

}
