package com.spring_boot_projects.RBAC.services.impl;

import com.spring_boot_projects.RBAC.dto.JwtAuthenticationResponse;
import com.spring_boot_projects.RBAC.dto.RefreshTokenRequest;
import com.spring_boot_projects.RBAC.dto.SignInRequest;
import com.spring_boot_projects.RBAC.dto.SignupRequest;
import com.spring_boot_projects.RBAC.entities.Role;
import com.spring_boot_projects.RBAC.entities.User;
import com.spring_boot_projects.RBAC.repository.UserRepository;
import com.spring_boot_projects.RBAC.services.AuthenticationService;
import com.spring_boot_projects.RBAC.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

//    public User signup(SignupRequest signupRequest){
//        User user = new User();
//
//        user.setUsername(signupRequest.getUsername());
//        user.setEmail(signupRequest.getEmail());
//        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
//        user.setRole(Role.STAFF);
//
//        return userRepository.save(user);
//    }

    public JwtAuthenticationResponse signin(SignInRequest signInRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));

        var user = userRepository.findByUsername(signInRequest.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Username or password"));

        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);

        return jwtAuthenticationResponse;

    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String username = jwtService.extractUsername(refreshTokenRequest.getToken());
        var user = userRepository.findByUsername(username).orElseThrow();

        if(jwtService.isTokenValid(refreshTokenRequest.getToken(), user)){
            var jwt = jwtService.generateToken(user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());

            return jwtAuthenticationResponse;
        }

        throw new RuntimeException("Invalid refresh token");
    }
}
