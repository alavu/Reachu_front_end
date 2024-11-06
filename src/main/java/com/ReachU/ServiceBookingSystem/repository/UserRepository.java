package com.ReachU.ServiceBookingSystem.repository;

import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String email);
    Optional<User> findById(Long id);
    User findByEmail(String email);

    Optional<User> findUserByEmail(String email);


//    Optional<User> findByUserRole(UserRole userRole);

//    Optional<User> findUserByRole(UserRole userRole);
//
}
