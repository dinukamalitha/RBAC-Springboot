package com.spring_boot_projects.RBAC.services;

import com.spring_boot_projects.RBAC.dto.JwtAuthenticationResponse;
import com.spring_boot_projects.RBAC.dto.RefreshTokenRequest;
import com.spring_boot_projects.RBAC.dto.SignInRequest;
import com.spring_boot_projects.RBAC.dto.SignupRequest;
import com.spring_boot_projects.RBAC.entities.User;

public interface AuthenticationService {

//    User signup(SignupRequest signupRequest);

    JwtAuthenticationResponse signin(SignInRequest signInRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
