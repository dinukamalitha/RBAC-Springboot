package com.spring_boot_projects.RBAC.services;

public interface EmailService {
    void sendEmail(String to, String subject, String content);
}
