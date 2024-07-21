package com.ReachU.ServiceBookingSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
}
