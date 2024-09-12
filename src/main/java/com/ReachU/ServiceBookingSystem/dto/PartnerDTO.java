package com.ReachU.ServiceBookingSystem.dto;

import com.ReachU.ServiceBookingSystem.enums.UserRole;
import lombok.Data;

import java.util.List;

@Data
public class PartnerDTO {
    private Long id;
    private String name;
    private String lastname;
    private String email;
    private String password;
    private String phone;
    private byte[] img;
    private String service;
//    private List<Long> serviceIds; // Use service IDs instead of full service objects
}