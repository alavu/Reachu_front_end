package com.ReachU.ServiceBookingSystem.dto;

import lombok.Data;

@Data
public class SignupRequestDTO {

    private String email;

    private String password;

    private String name;

    private String lastname;

    private String phone;

}
