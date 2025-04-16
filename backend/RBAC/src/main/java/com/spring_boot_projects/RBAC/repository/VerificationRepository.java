package com.spring_boot_projects.RBAC.repository;

import com.spring_boot_projects.RBAC.entities.Verification;
import org.springframework.data.jpa.repository.JpaRepository;


public interface VerificationRepository extends JpaRepository<Verification, Integer> {
    Verification findByEmail(String email);
}
