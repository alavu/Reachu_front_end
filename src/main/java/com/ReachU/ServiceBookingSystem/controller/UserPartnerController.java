package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.entity.PartnerEntity;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.services.client.clientService.ClientService;
import com.ReachU.ServiceBookingSystem.services.userPartner.UserPartnerService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/connections")
@RequiredArgsConstructor
public class UserPartnerController {

    private final UserPartnerService userPartnerService;

    // Connect a user to a partner
    @PostMapping("/connect/{userId}/{partnerId}")
    public ResponseEntity<String> connectUserToPartner(@PathVariable Long userId, @PathVariable Long partnerId) {
        try {
            userPartnerService.connectUserToPartner(userId, partnerId);
            return ResponseEntity.ok("User connected to partner successfully.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Get all partners connected to a user
//    @GetMapping("/partners")
//    public ResponseEntity<List<PartnerEntity>> getConnectedPartners(@AuthenticationPrincipal UserDetails userDetails) {
//        Long userId = clientService.getUserIdFromUserDetails(userDetails);
//        List<PartnerEntity> partners = userPartnerService.getConnectedPartners(userId);
//        return ResponseEntity.ok(partners);
//    }

    @GetMapping("/partners/{userId}")
    public ResponseEntity<List<PartnerEntity>> getConnectedPartners(@PathVariable Long userId) {
        List<PartnerEntity> partners = userPartnerService.getConnectedPartners(userId);
        return ResponseEntity.ok(partners);
    }
//    // Get all users connected to a partner
    @GetMapping("/users")
    public ResponseEntity<List<User>> getConnectedUsers(@RequestParam Long partnerId) {
        List<User> users = userPartnerService.getConnectedUsers(partnerId);
        return ResponseEntity.ok(users);
    }

    // Disconnect a user from a partner
    @DeleteMapping("/disconnect")
    public ResponseEntity<String> disconnectUserFromPartner(@RequestParam Long userId, @RequestParam Long partnerId) {
        try {
            userPartnerService.disconnectUserFromPartner(userId, partnerId);
            return ResponseEntity.ok("User disconnected from partner successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
