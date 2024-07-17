package com.ReachU.ServiceBookingSystem.configs;

import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.enums.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private String email;

    private String password;

    private boolean accountLocked;

    private boolean enabled;

    private UserRole role;

    public CustomUserDetails(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.accountLocked = user.isAccountLocked();
        this.enabled = user.isEnabled();
        this.role = user.getRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Customize based on your needs
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Customize based on your needs
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}

