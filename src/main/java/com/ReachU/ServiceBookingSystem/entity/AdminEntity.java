package com.ReachU.ServiceBookingSystem.entity;

import com.ReachU.ServiceBookingSystem.enums.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@Table(name = "admin")
public class AdminEntity {

    @Id
    private String email;
    private String password;
    private UserRole userRole;
}
