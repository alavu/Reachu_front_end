package com.ReachU.ServiceBookingSystem.dto;

import com.ReachU.ServiceBookingSystem.enums.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "AuthenticationResponse", description = "Response object for user authentication")
public class AuthenticationResponse {

    @Schema(description = "JWT token for authentication")
    private String jwt;

    @Schema(description = "Unique identifier of the user")
    private Long userId;

    @Schema(description = "Role of the user")
    private UserRole userRole;
}
