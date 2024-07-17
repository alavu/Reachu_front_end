package com.ReachU.ServiceBookingSystem.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "AuthenticationRequest", description = "Request object for user authentication")
public class AuthenticationRequest {

    @Schema(description = "Email address of the customer", example = "customer@gmail.com")
    private String username;

    @Schema(description = "Password of the customer", example = "@123customer")
    private String password;
}
