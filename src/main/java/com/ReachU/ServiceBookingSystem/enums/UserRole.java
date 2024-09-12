package com.ReachU.ServiceBookingSystem.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public enum UserRole {

    CLIENT("CLIENT"), ADMIN("ADMIN"),PARTNER("PARTNER");

    private final String type;

}
