package com.spring_boot_projects.RBAC.services;

import com.spring_boot_projects.RBAC.dto.ViewRequest;
import com.spring_boot_projects.RBAC.repository.UserRepository;

import java.util.List;

public interface UserService {

    List<ViewRequest> getUsers();

    String forgotPassword(String email);

    String verifyOtp(String email, String otp);

    String resetPassword(String email, String password, String confirmPassword);
}
