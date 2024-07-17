package com.ReachU.ServiceBookingSystem.services.authentication;

import com.ReachU.ServiceBookingSystem.dto.LoginDTO;
import com.ReachU.ServiceBookingSystem.dto.SignupRequestDTO;
import com.ReachU.ServiceBookingSystem.dto.UserDto;
import com.ReachU.ServiceBookingSystem.entity.Token;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.enums.EmailTemplateName;
import com.ReachU.ServiceBookingSystem.enums.UserRole;
import com.ReachU.ServiceBookingSystem.repository.TokenRepository;
import com.ReachU.ServiceBookingSystem.repository.UserRepository;
import com.ReachU.ServiceBookingSystem.response.LoginResponse;
import com.ReachU.ServiceBookingSystem.services.client.ClientService;
import com.ReachU.ServiceBookingSystem.utill.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    private final TokenRepository tokenRepository;

    private final ClientService clientService;

    private final AuthenticationManager authenticationManager;

    private final EmailService emailService;

    private final UserDetailsService userDetailsService;



    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;


    public UserDto signupClient(SignupRequestDTO signupRequestDTO) {
        User user = new User();

        user.setName(signupRequestDTO.getName());
        user.setLastname(signupRequestDTO.getLastname());
        user.setEmail(signupRequestDTO.getEmail());
        user.setPhone(signupRequestDTO.getPhone());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequestDTO.getPassword()));
        user.setRole(UserRole.CLIENT);
        sendValidationEmail(user);
        return userRepository.save(user).getDto();
    }

    public Boolean presentByEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    public UserDto signupCompany(SignupRequestDTO signupRequestDTO) {
        User user = new User();

        user.setName(signupRequestDTO.getName());
        user.setEmail(signupRequestDTO.getEmail());
        user.setPhone(signupRequestDTO.getPhone());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequestDTO.getPassword()));
        user.setEnabled(false);
        user.setAccountLocked(false);

        user.setRole(UserRole.COMPANY);

        return userRepository.save(user).getDto();
    }


    @Override
    public LoginResponse authenticate(LoginDTO loginDTO) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginDTO.getEmail(),
                    loginDTO.getPassword()
            ));
        } catch (BadCredentialsException e) {
            // Add logging for bad credentials
            throw new BadCredentialsException("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(loginDTO.getEmail());
        final String jwtToken = jwtUtil.generateToken(String.valueOf(userDetails));

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return LoginResponse.builder()
                    .token(jwtToken)
                    .userId(user.getId())
                    .build();
        }
        throw new RuntimeException("User not found");
    }


    @Override
    public void activateAccount(String token) {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been send to the same email address");
        }
        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    private String generateAndSaveActivationToken(User user) {
        // Generate a token
        String generatedToken = generateActivationCode();
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(5))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }


    private void sendValidationEmail(User user) {
        var newToken = generateAndSaveActivationToken(user);
        //Send email
        emailService.sendEmail(
                user.getEmail(),
                user.getName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateActivationCode() {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < 6; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }


}
