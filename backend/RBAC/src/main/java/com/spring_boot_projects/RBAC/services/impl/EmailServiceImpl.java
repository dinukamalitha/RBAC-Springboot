package com.spring_boot_projects.RBAC.services.impl;

import com.spring_boot_projects.RBAC.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    @Autowired
    public JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("tradeasy.official01@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);

        mailSender.send(message);

    }
}
