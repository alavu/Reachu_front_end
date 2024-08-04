package com.ReachU.ServiceBookingSystem.repository;

import com.ReachU.ServiceBookingSystem.entity.AdminEntity;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, String> {

    Optional<AdminEntity> findAdminEntityByUserRole(UserRole userRole);

    Optional<AdminEntity> findFirstByEmail(String email);
}
