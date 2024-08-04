package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.configs.CustomUserDetails;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.services.googleauth.UserService;
import com.ReachU.ServiceBookingSystem.utill.GoogleUserInfo;
import com.ReachU.ServiceBookingSystem.utill.JwtUtil;
import jakarta.servlet.http.HttpSession;
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

//    @GetMapping("/check-google-login")
////    public ResponseEntity<?> checkGoogleLogin(HttpSession session) {
////        try {
////            GoogleUserInfo googleUserInfo = (GoogleUserInfo) session.getAttribute("googleUserInfo");
////            if (googleUserInfo == null) {
////                log.warn("GoogleUserInfo is null in session");
////            }
////            boolean isGoogleLogin = googleUserInfo != null && googleUserInfo.isEmailVerified();
////            log.info("Google login status: {}", isGoogleLogin);
////            return ResponseEntity.ok().body(new StatusResponse(isGoogleLogin));
////        } catch (Exception e) {
////            log.error("Error checking Google login status", e);
////            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
////                    .body(new StatusResponse(false));
////        }
////    }

    @GetMapping("/check-google-login")
    public ResponseEntity<?> checkGoogleLogin(HttpSession session) {
        try {
            // Retrieve the Google user information from the session
            GoogleUserInfo googleUserInfo = (GoogleUserInfo) session.getAttribute("googleUserInfo");

            // Determine the login status based on whether GoogleUserInfo is present and email_verified is true
            boolean isGoogleLogin = googleUserInfo != null && googleUserInfo.isEmailVerified();

            // Log the status for debugging
            log.info("Google login status: {}", isGoogleLogin);

            // Return the appropriate response
            return ResponseEntity.ok().body(new StatusResponse(isGoogleLogin));
        } catch (Exception e) {
            // Log the error
            log.error("Error in checkGoogleLogin", e);

            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new StatusResponse(false));
        }
    }

    static class StatusResponse {
        private boolean loggedIn;

        public StatusResponse(boolean loggedIn) {
            this.loggedIn = loggedIn;
        }

        public boolean isLoggedIn() {
            return loggedIn;
        }

        public void setLoggedIn(boolean loggedIn) {
            this.loggedIn = loggedIn;
        }
    }
}

