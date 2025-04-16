package com.spring_boot_projects.RBAC.services.impl;

import com.spring_boot_projects.RBAC.entities.Role;
import com.spring_boot_projects.RBAC.entities.User;
import com.spring_boot_projects.RBAC.repository.UserRepository;
import com.spring_boot_projects.RBAC.services.AdminService;
//import com.spring_boot_projects.RBAC.services.EmailService;
import com.spring_boot_projects.RBAC.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public User create(User user) {
        User newUser = new User();

        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setEmail(user.getEmail());

        String inputRole = user.getRole().name().toUpperCase();

        if (!inputRole.equals("STAFF") && !inputRole.equals("SALES")) {
            throw new IllegalArgumentException("Invalid Role");
        }
        newUser.setRole(user.getRole());

        // Send an email with the created user details
        String emailSubject = "Welcome to the platform!";
        String emailContent = "Hello " + newUser.getUsername() + ",\n\nYour account has been created successfully.\n\n" +
                "Your password is: " + user.getPassword() + "\n\nPlease change it as soon as possible.";

        emailService.sendEmail(newUser.getEmail(), emailSubject, emailContent);

        return userRepository.save(newUser);
    }
}
