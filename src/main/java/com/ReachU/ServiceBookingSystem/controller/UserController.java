package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.dto.UserDto;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.services.user.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserManagementService userManagementService;

   /* @GetMapping("/list")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userManagementService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/{userId}/block")
    public ResponseEntity<Void> blockUser(@PathVariable Long userId) {
        userManagementService.blockUser(userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{userId}/unblock")
    public ResponseEntity<Void> unblockUser(@PathVariable Long userId) {
        userManagementService.unblockUser(userId);
        return ResponseEntity.ok().build();
    }*/


    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userManagementService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/block/{id}")
    public ResponseEntity<?> blockUser(@PathVariable Long id) {
        var data = userManagementService.blockUser(id);
        System.out.println("blocked data ->" + data);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/unblock/{id}")
    public ResponseEntity<?> unblockUser(@PathVariable Long id) {
        userManagementService.unblockUser(id);
        return ResponseEntity.ok().build();
    }
}
