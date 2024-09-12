package com.ReachU.ServiceBookingSystem.utill;

import com.ReachU.ServiceBookingSystem.entity.AdminEntity;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.enums.UserRole;
import com.ReachU.ServiceBookingSystem.repository.AdminRepository;
import com.ReachU.ServiceBookingSystem.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class AdminInitializer {

    private final AdminRepository adminRepository;

    private final PasswordEncoder passwordEncoder;

    String adminEmail = "admin@gmail.com";
    String adminPassword = "admin";

    @PostConstruct
    public void createAnAdminAccount() {
        Optional<AdminEntity> optionalAdmin = adminRepository.findFirstByEmail(adminEmail);
        if (optionalAdmin.isEmpty()) {
            String password = passwordEncoder.encode(adminPassword);
            AdminEntity admin = new AdminEntity(1L,adminEmail,password, UserRole.ADMIN);
            adminRepository.save(admin);
            log.info("Admin account created successfully");
        } else {
            log.info("Admin account already exists");
        }
    }

}
