package com.ReachU.ServiceBookingSystem.response;

import lombok.Builder;

import java.util.Objects;

@Builder
public record LoginResponse(String token, Long userId) {

    public LoginResponse build() {
        Objects.requireNonNull(token, "Token must not be null");
        Objects.requireNonNull(userId, "User ID must not be null");
        return new LoginResponse(token, userId);
    }
}