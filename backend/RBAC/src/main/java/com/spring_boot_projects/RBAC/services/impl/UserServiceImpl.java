package com.spring_boot_projects.RBAC.services.impl;

import com.spring_boot_projects.RBAC.dto.ViewRequest;
import com.spring_boot_projects.RBAC.entities.User;
import com.spring_boot_projects.RBAC.entities.Verification;
import com.spring_boot_projects.RBAC.repository.UserRepository;
import com.spring_boot_projects.RBAC.repository.VerificationRepository;
import com.spring_boot_projects.RBAC.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final VerificationRepository verificationRepository;
    private final PasswordEncoder passwordEncoder;

    public List<ViewRequest> getUsers(){
        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {
            ViewRequest dto = new ViewRequest();
            dto.setId(user.getId());
            dto.setUsername(user.getUsername());
            dto.setEmail(user.getEmail());
            dto.setRole(user.getRole());
            return dto;
        }).collect(Collectors.toList());
    }

    public String generateOtp() {
        int otp = (int)(Math.random() * 900000) + 100000;
        return String.valueOf(otp);
    }

    public String forgotPassword(String email){
        Optional<User> user = userRepository.findByEmail(email);

        String otp = generateOtp();
        String subject = "OTP Verification";
        String content = "Hello " + (user.isPresent() ? user.get().getUsername() : null) + ",\n\nYour account has been created successfully.\n\n" +
                "Your OTP is: " + otp;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("tradeasy.official01@gmail.com");
        message.setTo(email);
        message.setSubject(subject);
        message.setText(content);

        mailSender.send(message);

        Verification verification = verificationRepository.findByEmail(email);

        if (verification != null) {
            verification.setOtp(otp);
            verification.setExpiration(new Date(System.currentTimeMillis() + 5 * 60 * 1000));
        } else {
            verification = new Verification();
            verification.setEmail(email);
            verification.setOtp(otp);
            verification.setExpiration(new Date(System.currentTimeMillis() + 5 * 60 * 1000));
        }

        verificationRepository.save(verification);

        return "OTP sent successfully";
    }

    public String verifyOtp(String email, String otp){
        Verification verification = verificationRepository.findByEmail(email);

        if(!verification.getOtp().equals(otp)){
            return "OTP verification failed";
        }

        verificationRepository.delete(verification);
        return "OTP verified successfully";
    }

    public String resetPassword(String email, String password, String confirmPassword){
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && password.equals(confirmPassword)) {
            user.get().setPassword(passwordEncoder.encode(password));
            userRepository.save(user.get());
        }

        return "Password reset successfully";
    }
}
