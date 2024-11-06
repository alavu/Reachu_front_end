package com.ReachU.ServiceBookingSystem.services.userPartner;

import com.ReachU.ServiceBookingSystem.entity.PartnerEntity;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.entity.UserPartnerConnection;
import com.ReachU.ServiceBookingSystem.repository.PartnerRepository;
import com.ReachU.ServiceBookingSystem.repository.UserPartnerConnectionRepository;
import com.ReachU.ServiceBookingSystem.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserPartnerService {

    private final UserPartnerConnectionRepository connectionRepository;
    private final UserRepository userRepository; // Assuming you have a UserRepository for User entity
    private final PartnerRepository partnerRepository; // Assuming you have a PartnerRepository for PartnerEntity

    // Connect a user to a partner
    public void connectUserToPartner(Long userId, Long partnerId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        PartnerEntity partner = partnerRepository.findById(partnerId)
                .orElseThrow(() -> new EntityNotFoundException("Partner not found."));

        // Check if the connection already exists
        if (connectionRepository.existsByUserIdAndPartnerId(userId, partnerId)) {
            throw new IllegalStateException("Connection already exists.");
        }

        UserPartnerConnection connection = new UserPartnerConnection();
        connection.setUser(user);
        connection.setPartner(partner);

        connectionRepository.save(connection);
    }

    // Get all partners connected to a user
    public List<PartnerEntity> getConnectedPartners(Long userId) {
        List<UserPartnerConnection> connections = connectionRepository.findByUserId(userId);
        return connections.stream()
                .map(UserPartnerConnection::getPartner)
                .collect(Collectors.toList());
    }

    public List<?> getConnectedPartner() {
        return connectionRepository.findAll();
    }

    // Get all users connected to a partner
    public List<User> getConnectedUsers(Long partnerId) {
        List<UserPartnerConnection> connections = connectionRepository.findByPartnerId(partnerId);
        return connections.stream()
                .map(UserPartnerConnection::getUser)
                .collect(Collectors.toList());
    }

    // Disconnect a user from a partner
    public void disconnectUserFromPartner(Long userId, Long partnerId) {
        UserPartnerConnection connection = connectionRepository.findByUserIdAndPartnerId(userId, partnerId)
                .orElseThrow(() -> new EntityNotFoundException("Connection not found."));
        connectionRepository.delete(connection);
    }
}

