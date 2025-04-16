package com.spring_boot_projects.RBAC.dto;

import com.spring_boot_projects.RBAC.entities.Role;
import lombok.Data;

@Data
public class ViewRequest {
    private Integer id;
    private String username;
    private String email;
    private Role role;

}
