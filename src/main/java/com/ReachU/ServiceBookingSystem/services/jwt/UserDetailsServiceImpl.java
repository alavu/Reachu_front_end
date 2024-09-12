//package com.ReachU.ServiceBookingSystem.services.jwt;
//
//import com.ReachU.ServiceBookingSystem.entity.User;
//import com.ReachU.ServiceBookingSystem.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.Optional;
//
//@Service
//@Slf4j
//@RequiredArgsConstructor
//public class UserDetailsServiceImpl implements UserDetailsService {
//    private final UserRepository userRepository;
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//
//       /* Optional<User> userOptional = userRepository.findFirstByEmail(username);
//
//        User user = userOptional.orElseThrow(() -> {
//            System.out.println("User not found");
//            log.info("User not found");
//            return new UsernameNotFoundException("No user found with email: " + username);
//
//        });
//
//        return new org.springframework.security.core.userdetails.User(
//                user.getEmail(),
//                user.getPassword(),
//                user.getAuthorities()
//        );
//    }*/
//        User user = userRepository.findByEmail(email);
//        if (user == null) throw new UsernameNotFoundException("Username not found", null);
//        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
//    }
//}
//
