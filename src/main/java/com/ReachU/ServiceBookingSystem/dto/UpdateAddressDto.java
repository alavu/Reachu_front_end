package com.ReachU.ServiceBookingSystem.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateAddressDto {

    @NotBlank(message = "Details are mandatory")
    private String details;

    private String label;
}
