package com.spring_boot_projects.RBAC.services;

import com.spring_boot_projects.RBAC.entities.User;

public interface AdminService {
    User create(User user);
}
