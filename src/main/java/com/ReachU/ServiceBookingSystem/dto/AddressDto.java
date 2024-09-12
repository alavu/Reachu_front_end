package com.ReachU.ServiceBookingSystem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddressDto {

    @NotBlank(message = "Details are mandatory")
    private String details;

    private String label;

    @NotNull(message = "User ID is mandatory")
    private Long userId;
}
