package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.configs.CustomUserDetailService;
import com.ReachU.ServiceBookingSystem.dto.*;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.repository.AdminRepository;
import com.ReachU.ServiceBookingSystem.repository.UserRepository;
import com.ReachU.ServiceBookingSystem.response.LoginResponse;
import com.ReachU.ServiceBookingSystem.services.authentication.AuthService;
import com.ReachU.ServiceBookingSystem.utill.JwtUtil;
import io.jsonwebtoken.io.IOException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Tag(
        name = "Authentication Controller",
        description = "Handles user authentication, including signup and login operations."
)
@SecuritySchemes({
        @SecurityScheme(name = "bearerToken", type = SecuritySchemeType.HTTP,
                scheme = "bearer", bearerFormat = "JWT", in = SecuritySchemeIn.HEADER)
})
@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthService authService;

    @Autowired
    private HttpSession session;

    @Operation(
            summary = "Create Account REST API",
            description = "REST API to create new Customer"
    )
    @ApiResponses(
            @ApiResponse(responseCode = "201", description = "HTTP Status CREATED")
    )
    @PostMapping("/client/sign-up")
    public ResponseEntity<?> signupClient(@RequestBody SignupRequestDTO signupRequestDTO) {

        if (authService.presentByEmail(signupRequestDTO.getEmail())) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Client already exists with this Email!");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        UserDto createdUser = authService.signupClient(signupRequestDTO);

        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @Operation(
            summary = "Admin Account Creation",
            description = "REST API to to create a Admin"
    )
    @ApiResponses(
            @ApiResponse(responseCode = "200", description = "HTTP Status CREATED")
    )
    @PostMapping("/partner/sign-up")
    public ResponseEntity<?> signupCompany(@RequestBody PartnerDTO partnerDTO) {

        if (authService.presentByEmail(partnerDTO.getEmail())) {
            return new ResponseEntity<>("Partner already exists with this Email!", HttpStatus.NOT_ACCEPTABLE);
        }

        PartnerDTO createdPartner = authService.signupPartner(partnerDTO);

        return new ResponseEntity<>(createdPartner, HttpStatus.OK);
    }


    @GetMapping("/activate-account")
    public void confirm(@RequestParam String token) {
        authService.activateAccount(token);
    }


    @GetMapping("/resend-activation-code")
    public ResponseEntity<?> resendActivationCode(@RequestParam String email) {
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Token is missing or invalid");
        }
        try {
            authService.resendActivationCode(email);
            return ResponseEntity.ok("Activation code resent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }


    @GetMapping("/logout")
    public ResponseEntity<?> signOut() {
        try {
            SecurityContextHolder.clearContext();
            session.invalidate();
            log.info("User logged out successfully");
            return ResponseEntity.ok().body("Logged out successfully");
        } catch (Exception e) {
            log.error("Logout failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed");
        }

    }

//    @PostMapping({"/authenticate"})
//    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
//                                          HttpServletResponse response) throws IOException, JSONException, java.io.IOException {
//
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
//                    authenticationRequest.getUsername(),authenticationRequest.getPassword()
//            ));
//        } catch (BadCredentialsException e){
//            throw new BadCredentialsException("Incorrect username or password", e);
//        }
//
//        Optional<User> optionalUser = userRepository.findFirstByEmail(authenticationRequest.getUsername());
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//            if (user.isBlocked()) { // Check if the user is blocked
//                log.warn("Blocked user attempted to authenticate: {}", user.getEmail());
//                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//                response.getWriter().write("User is blocked");
//                return;
//            }
//
//            log.info("User authenticated: {}", user.getEmail());
//            final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
//            final String jwt = jwtUtil.generateToken(userDetails.getUsername());
//
//        response.getWriter().write(new JSONObject()
//                .put("userId", user.getId())
//                .put("role", user.getUserRole())
//                .put("token", jwt)
//                .toString()
//        );
//
//        response.addHeader("Access-Control-Expose-Headers", "Authorization");
//        response.addHeader("Access-Control-Allow-Headers", "Authorization," +
//                " X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");
//
//        response.addHeader(HEADER_STRING, TOKEN_PREFIX+jwt);
//    }
//
//}

        @PostMapping("/authenticate")
        public LoginResponse authenticate(@RequestBody LoginDTO loginDTO) {
            return authService.authenticate(loginDTO);
        }

}