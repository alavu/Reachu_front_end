package com.ReachU.ServiceBookingSystem.services.googleauth;

import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public User processGoogleLogin(Map<String, Object> data) {
        try {
            // Extract the nested map
            Map<String, Object> nestedData = (Map<String, Object>) data.get("data");

            // Print the nested map for debugging
            System.out.println("Nested data: " + nestedData);

            // Extract email, name, image, and password from the nested data map
            String email = (String) nestedData.get("email");
            String name = (String) nestedData.get("given_name");
            String lastName = (String) nestedData.get("family_name");
            String phoneNumber = (String) nestedData.get("phone_number");
            String image = (String) nestedData.get("picture"); // Assuming 'picture' is the key for the image URL
            String password = "defaultPassword";
            String role = "USER"; // Set default role as user// You can set a default password or use some logic to generate one

            // Print the extracted values to ensure they are correct
            // Log the extracted values to ensure they are correct
            logger.debug("Extracted email: {}", email);
            logger.debug("Extracted name: {}", name);
            logger.debug("Extracted last name: {}", lastName);
            logger.debug("Extracted phone number: {}", phoneNumber);
            logger.debug("Extracted image: {}", image);

            if (email == null || name == null || lastName == null) {
                logger.error("Missing required fields in Google login data: email, name, or last name");
                throw new IllegalArgumentException("Missing required fields in Google login data");
            }

            // Find the user by email
            User user = userRepository.findByEmail(email);
            if (user == null) {
                // Create a new user if not found
                user = new User();
                user.setEmail(email);
                user.setName(name);
                user.setLastname(lastName);
                user.setPhone(phoneNumber);
//            user.setImage(image);
                user.setPassword(password);

                // Log debug information before saving
                logger.info("Creating new user: {}", user);

                // Save the user to the repository
                userRepository.save(user);

                // Confirm that the user was saved
                System.out.println("User saved successfully");
            } else {
                // Log debug information if user already exists
                logger.info("User already exists: {}", user);
            }

            return user;
        } catch (Exception e) {
            logger.error("Error processing Google login", e);
            throw new RuntimeException("Error processing Google login", e);
        }
    }

}
