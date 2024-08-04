package com.ReachU.ServiceBookingSystem.utill;

public class GoogleUserInfo {
    private boolean email_verified;

    public boolean isEmailVerified() {
        return email_verified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.email_verified = emailVerified;
    }

    @Override
    public String toString() {
        System.out.println("Email verified: " + email_verified);
        return "GoogleUserInfo{" +
                "emailVerified=" + email_verified +
                '}';
    }
}
