package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.dto.LoginDTO;
import com.ReachU.ServiceBookingSystem.dto.SignupRequestDTO;
import com.ReachU.ServiceBookingSystem.dto.UserDto;
import com.ReachU.ServiceBookingSystem.repository.AdminRepository;
import com.ReachU.ServiceBookingSystem.repository.UserRepository;
import com.ReachU.ServiceBookingSystem.response.LoginResponse;
import com.ReachU.ServiceBookingSystem.services.authentication.AuthService;
import com.ReachU.ServiceBookingSystem.services.jwt.UserDetailsServiceImpl;
import com.ReachU.ServiceBookingSystem.utill.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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
public class AuthenticationController {

    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final UserDetailsServiceImpl userDetailsService;

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    private final AdminRepository adminRepository;

    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String HEADER_STRING = "Authorization";
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
    @PostMapping("/company/sign-up")
    public ResponseEntity<?> signupCompany(@RequestBody SignupRequestDTO signupRequestDTO) {

        if (authService.presentByEmail(signupRequestDTO.getEmail())) {
            return new ResponseEntity<>("Company already exists with this Email!", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto createdUser = authService.signupCompany(signupRequestDTO);

        return new ResponseEntity<>(createdUser, HttpStatus.OK);
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


//    @PostMapping({"/authenticate"})
//    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
//                                          HttpServletResponse response) throws IOException, JSONException, java.io.IOException {
//
//        log.info("Authentication request received for user: {}", authenticationRequest.getUsername());
//
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
//                    authenticationRequest.getUsername(), authenticationRequest.getPassword()
//            ));
//        } catch (BadCredentialsException e) {
//            log.error("Authentication failed for user: {}", authenticationRequest.getUsername());
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            response.getWriter().write("Incorrect username or password");
//            return;
//        }
//
//        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
//        final String jwt = jwtUtil.generateToken(userDetails.getUsername());
//        Optional<User> optionalUser = userRepository.findFirstByEmail(authenticationRequest.getUsername());
//
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//            log.info("User authenticated: {}", user.getEmail());
//            response.getWriter().write(new JSONObject()
//                    .put("userId", user.getId())
//                    .put("role", user.getRole())
//                    .toString()
//            );
//        } else {
//            log.error("User not found: {}", authenticationRequest.getUsername());
//            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
//            response.getWriter().write("User not found");
//            return;
//        }
//
//        response.addHeader("Access-Control-Expose-Headers", "Authorization");
//        response.addHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");
//        response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
//    }

/*    @PostMapping({"/authenticate"})
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
                                          HttpServletResponse response) throws IOException, JSONException, java.io.IOException {

        log.info("Authentication request received for user: {}", authenticationRequest.getUsername());

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()
            ));
        } catch (BadCredentialsException e) {
            log.error("Authentication failed for user: {}", authenticationRequest.getUsername());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Incorrect username or password");
            return;
        }

        Optional<User> optionalUser = userRepository.findFirstByEmail(authenticationRequest.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) { // Check if the user is blocked
                log.warn("Blocked user attempted to authenticate: {}", user.getEmail());
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("User is blocked");
                return;
            }

            log.info("User authenticated: {}", user.getEmail());
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails.getUsername());

            response.getWriter().write(new JSONObject()
                    .put("userId", user.getId())
                    .put("role", user.getRole())
                    .toString()
            );

            response.addHeader("Access-Control-Expose-Headers", "Authorization");
            response.addHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");
            response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
        } else {
            log.error("User not found: {}", authenticationRequest.getUsername());
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("User not found");*/


    // Handle admin authentication separately
          /*  Optional<AdminEntity> optionalAdmin = adminRepository.findAdminEntityByUserRole(UserRole.valueOf(authenticationRequest.getUsername()));
            if (optionalAdmin.isPresent()) {
                AdminEntity admin = optionalAdmin.get();
                log.info("Admin authenticated: {}", admin.getEmail());
                final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
                final String jwt = jwtUtil.generateToken(userDetails.getUsername());

                response.getWriter().write(new JSONObject()
                        .put("userId", admin.getEmail())
                        .put("role", UserRole.ADMIN)
                        .toString()
                );

                response.addHeader("Access-Control-Expose-Headers", "Authorization");
                response.addHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");
                response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
            } else {
                log.error("Admin User not found: {}", authenticationRequest.getUsername());
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("Admin User not found");
            }*/
//        }
//    }

    @PostMapping("/authenticate")
    public LoginResponse authenticate(@RequestBody  @Valid  LoginDTO loginDTO, HttpSession session) {
        return authService.authenticate(loginDTO);
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

}
