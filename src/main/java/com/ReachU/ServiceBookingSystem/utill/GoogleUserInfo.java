package com.ReachU.ServiceBookingSystem.utill;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GoogleUserInfo {
    private String email;

    @Override
    public String toString() {
        return "GoogleUserInfo{" +
                "email='" + email + '\'' +
                '}';
    }
}