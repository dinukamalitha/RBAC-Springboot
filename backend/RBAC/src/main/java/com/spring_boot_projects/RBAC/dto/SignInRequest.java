package com.spring_boot_projects.RBAC.dto;

import lombok.Data;

@Data
public class SignInRequest {

    private String username;
    private String password;
}
