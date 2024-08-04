package com.ReachU.ServiceBookingSystem.services.jwt;

import com.ReachU.ServiceBookingSystem.entity.AdminEntity;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.repository.AdminRepository;
import com.ReachU.ServiceBookingSystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findFirstByEmail(email);
        if (user.isPresent()) {
            return new org.springframework.security.core.userdetails.User(user.get().getEmail(), user.get().getPassword(), new ArrayList<>());
        }

        Optional<AdminEntity> admin = adminRepository.findFirstByEmail(email);
        if (admin.isPresent()) {
            return new org.springframework.security.core.userdetails.User(admin.get().getEmail(), admin.get().getPassword(), new ArrayList<>());
        }

        throw new UsernameNotFoundException("Username not found");
    }
}
