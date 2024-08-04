package com.ReachU.ServiceBookingSystem.repository;

import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String email);

    User findByEmail(String email);

//    Optional<User> findByUserRole(UserRole userRole);

    Optional<User> findUserByRole(UserRole userRole);
}
