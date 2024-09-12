package com.ReachU.ServiceBookingSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class UserGoogle {

    @Id
    private String userId;
    private String userPassword;

    public UserGoogle() {
    }

    public UserGoogle(String userId, String userPassword) {
        this.userId = userId;
        this.userPassword = userPassword;
    }

}
