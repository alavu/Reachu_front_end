package com.ReachU.ServiceBookingSystem.repository;

import com.ReachU.ServiceBookingSystem.entity.PartnerEntity;
import com.ReachU.ServiceBookingSystem.entity.User;
import jakarta.mail.Part;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PartnerRepository extends JpaRepository<PartnerEntity, Long> {
    Optional<PartnerEntity> findByEmail(String email);
    Optional<PartnerEntity> findFirstByEmail(String email);
}
