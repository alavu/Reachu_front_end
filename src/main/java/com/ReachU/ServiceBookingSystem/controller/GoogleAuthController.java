package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.configs.CustomUserDetails;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.services.googleauth.UserService;
import com.ReachU.ServiceBookingSystem.utill.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
@Slf4j
@RequestMapping("/api/auth")
public class GoogleAuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, Object> data) {
        try {
            log.info("Received Google login request with data: {}", data);
            User user = userService.processGoogleLogin(data);
            CustomUserDetails customUserDetails = new CustomUserDetails(user);
            String token = jwtUtil.generateToken(String.valueOf(customUserDetails));
            System.out.println("Token controller");
            return ResponseEntity.ok().body(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Google login failed");
        }
    }
}

