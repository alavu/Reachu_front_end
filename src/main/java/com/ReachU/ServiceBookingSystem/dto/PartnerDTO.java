package com.ReachU.ServiceBookingSystem.dto;
import lombok.Data;

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
    private Double rating;
}