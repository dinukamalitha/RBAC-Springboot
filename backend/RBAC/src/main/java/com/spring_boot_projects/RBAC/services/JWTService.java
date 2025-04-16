package com.spring_boot_projects.RBAC.services;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JWTService {

    String generateToken(UserDetails userDetails);

    String extractUsername(String token);

    boolean isTokenValid(String token, UserDetails userDetails);

    String generateRefreshToken(Map<String,Object> extraClaims, UserDetails userDetails);

}
