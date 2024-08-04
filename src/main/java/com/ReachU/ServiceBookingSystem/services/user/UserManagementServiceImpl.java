package com.ReachU.ServiceBookingSystem.services.user;

import com.ReachU.ServiceBookingSystem.dto.UserDto;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.enums.UserRole;
import com.ReachU.ServiceBookingSystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserManagementServiceImpl implements UserManagementService {

    private final UserRepository userRepository;

    @Override
    public User save(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword()); // Consider encrypting the password before saving
        user.setName(userDto.getName());
        user.setLastname(userDto.getLastname());
        user.setPhone(userDto.getPhone());
        user.setRole(userDto.getRole());
        user.setEnabled(false);
        user.set_blocked(false);
        return userRepository.save(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() != UserRole.COMPANY)
                .map(this::convertToDto)
                .toList();
    }

   @Override
   public User blockUser(Long id) {
       User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
       user.set_blocked(true);
       userRepository.save(user);
       return user;
   }


   @Override
    public boolean unblockUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.set_blocked(false);
        userRepository.save(user);
        return true;
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword()); // Password should not be exposed in DTO, handle it carefully
        userDto.setName(user.getName());
        userDto.setLastname(user.getLastname());
        userDto.setPhone(user.getPhone());
        userDto.setRole(user.getRole());
        userDto.set_blocked(false);
        return userDto;
    }
}
