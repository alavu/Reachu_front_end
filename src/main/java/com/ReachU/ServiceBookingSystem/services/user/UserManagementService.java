package com.ReachU.ServiceBookingSystem.services.user;

import com.ReachU.ServiceBookingSystem.dto.UserDto;
import com.ReachU.ServiceBookingSystem.entity.User;

import java.util.List;

public interface UserManagementService {

    User save(UserDto userDto);

    public List<UserDto> getAllUsers();

    User blockUser(Long userId);

    boolean unblockUser(Long userId);
}
