package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.configs.GoogleCustomUserDetails;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.services.googleauth.UserService;
import com.ReachU.ServiceBookingSystem.utill.GoogleUserInfo;
import com.ReachU.ServiceBookingSystem.utill.JwtUtil;
import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import lombok.Setter;
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
            GoogleCustomUserDetails googleCustomUserDetails = new GoogleCustomUserDetails(user);
            String token = jwtUtil.generateToken(googleCustomUserDetails);
            System.out.println("Token controller");
            return ResponseEntity.ok().body(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Google login failed");
        }
    }

    @GetMapping("/check-google-login")
    public ResponseEntity<StatusResponse> checkGoogleLogin(HttpSession session) {
        try {
            // Retrieve the GoogleUserInfo object from the session
            GoogleUserInfo googleUserInfo = (GoogleUserInfo) session.getAttribute("googleUserInfo");

            // Log the retrieved GoogleUserInfo object
            log.info("Retrieved GoogleUserInfo from session: {}", googleUserInfo);

            // Determine the login status based on the presence of GoogleUserInfo and email
            boolean isGoogleLogin = googleUserInfo != null && googleUserInfo.getEmail() != null;

            // Log the status for debugging
            log.info("Google login status: {}", isGoogleLogin);

            // Return the appropriate response
            return ResponseEntity.ok(new StatusResponse(isGoogleLogin));
        } catch (Exception e) {
            // Log the error
            log.error("Error in checkGoogleLogin", e);

            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new StatusResponse(false));
        }
    }

    @PostMapping("/google-callback")
    public ResponseEntity<String> googleCallback(HttpSession session, @RequestParam Map<String, String> params) {
        try {
            // Extract email from the request parameters (assuming it is passed this way)
            String email = params.get("email");

            // Create a new GoogleUserInfo object
            GoogleUserInfo googleUserInfo = new GoogleUserInfo();

            // Check if email is null or empty
            if (email != null && !email.isEmpty()) {
                googleUserInfo.setEmail(email);
            } else {
                return ResponseEntity.badRequest().body("Email is required");
            }

            // Store the GoogleUserInfo object in the session
            session.setAttribute("googleUserInfo", googleUserInfo);

            // Log the stored information
            log.info("GoogleUserInfo set in session: {}", googleUserInfo);

            return ResponseEntity.ok("Google login successful");
        } catch (Exception e) {
            log.error("Error during Google login callback", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during login");
        }
    }

    @Setter
    @Getter
    public static class StatusResponse {
        private boolean loggedIn;

        public StatusResponse(boolean loggedIn) {
            this.loggedIn = loggedIn;
        }

    }
}