package com.spring_boot_projects.RBAC.controller;

import com.spring_boot_projects.RBAC.entities.User;
import com.spring_boot_projects.RBAC.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from admin!");
    }

    @PostMapping("/create")
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(adminService.create(user));
    }
}
