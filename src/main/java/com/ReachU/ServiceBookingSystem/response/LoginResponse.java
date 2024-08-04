package com.ReachU.ServiceBookingSystem.response;

import com.ReachU.ServiceBookingSystem.enums.UserRole;
import lombok.Builder;

import java.util.Objects;
@Builder
public record LoginResponse(String token, String email, UserRole userRole) {

    public LoginResponse build() {
        Objects.requireNonNull(token, "Token must not be null");
//        Objects.requireNonNull(userId, "User ID must not be null");
        Objects.requireNonNull(email, "User Email must not be null");
        Objects.requireNonNull(userRole, "User Role must not be null");
        return new LoginResponse(token, email,userRole);
    }
}