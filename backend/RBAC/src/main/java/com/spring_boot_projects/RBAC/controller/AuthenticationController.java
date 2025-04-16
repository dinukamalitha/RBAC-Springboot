package com.spring_boot_projects.RBAC.controller;

import com.spring_boot_projects.RBAC.dto.JwtAuthenticationResponse;
import com.spring_boot_projects.RBAC.dto.RefreshTokenRequest;
import com.spring_boot_projects.RBAC.dto.SignInRequest;
import com.spring_boot_projects.RBAC.dto.SignupRequest;
import com.spring_boot_projects.RBAC.entities.User;
import com.spring_boot_projects.RBAC.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

//    @PostMapping("/signup")
//    public ResponseEntity<User> signup(@RequestBody SignupRequest signupRequest) {
//        return ResponseEntity.ok(authenticationService.signup(signupRequest));
//    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SignInRequest signInRequest) {
        return ResponseEntity.ok(authenticationService.signin(signInRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }
}
