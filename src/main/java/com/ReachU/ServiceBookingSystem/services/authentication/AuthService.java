package com.ReachU.ServiceBookingSystem.services.authentication;

import com.ReachU.ServiceBookingSystem.dto.LoginDTO;
import com.ReachU.ServiceBookingSystem.dto.SignupRequestDTO;
import com.ReachU.ServiceBookingSystem.dto.UserDto;
import com.ReachU.ServiceBookingSystem.response.LoginResponse;

public interface AuthService {

    UserDto signupClient(SignupRequestDTO signupRequestDTO);

    Boolean presentByEmail(String email);

    UserDto signupCompany(SignupRequestDTO signupRequestDTO);

    LoginResponse authenticate(LoginDTO loginDTO);

    void activateAccount(String token);
}
