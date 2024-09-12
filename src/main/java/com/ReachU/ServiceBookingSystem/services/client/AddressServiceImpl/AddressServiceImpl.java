package com.ReachU.ServiceBookingSystem.services.client.AddressServiceImpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.ReachU.ServiceBookingSystem.dto.AddressDto;
import com.ReachU.ServiceBookingSystem.dto.UpdateAddressDto;
import com.ReachU.ServiceBookingSystem.entity.Address;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.exceptions.ResourceNotFoundException;
import com.ReachU.ServiceBookingSystem.repository.AddressRepository;
import com.ReachU.ServiceBookingSystem.repository.UserRepository;
import com.ReachU.ServiceBookingSystem.services.client.addressService.AddressService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<Address> getAddressesByUserId(Long userId) {
        log.info("Fetching addresses for user with ID: {}", userId);
        return addressRepository.findByUserId(userId);
    }

    @Override
    public Address addAddress(AddressDto addressDto) {
        log.info("Adding new address: {}", addressDto);

        // Map DTO to Entity
        Address address = modelMapper.map(addressDto, Address.class);

        // Fetch and set User
        User user = userRepository.findById(addressDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + addressDto.getUserId()));
        address.setUser(user);

        Address savedAddress = addressRepository.save(address);
        log.info("Address saved with ID: {}", savedAddress.getId());
        return savedAddress;
    }

    @Override
    public Address updateAddress(Long id, UpdateAddressDto updateAddressDto) {
        log.info("Updating address with ID: {}", id);

        Address existingAddress = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found with id " + id));

        // Update fields
        existingAddress.setDetails(updateAddressDto.getDetails());
        existingAddress.setLabel(updateAddressDto.getLabel());

        Address updatedAddress = addressRepository.save(existingAddress);
        log.info("Address updated with ID: {}", updatedAddress.getId());
        return updatedAddress;
    }

    @Override
    public void deleteAddress(Long id) {
        log.info("Deleting address with ID: {}", id);

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found with id " + id));

        addressRepository.delete(address);
        log.info("Address deleted with ID: {}", id);
    }
}
