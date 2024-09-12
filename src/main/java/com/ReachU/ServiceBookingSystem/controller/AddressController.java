package com.ReachU.ServiceBookingSystem.controller;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ReachU.ServiceBookingSystem.dto.AddressDto;
import com.ReachU.ServiceBookingSystem.dto.UpdateAddressDto;
import com.ReachU.ServiceBookingSystem.entity.Address;
import com.ReachU.ServiceBookingSystem.services.client.addressService.AddressService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/addresses")
@Slf4j
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    /**
     * Retrieve all addresses for a specific user.
     *
     * @param userId ID of the user
     * @return List of addresses
     */
    @GetMapping
    public ResponseEntity<List<Address>> getAddresses(@RequestParam Long userId) {
        log.info("GET request for addresses of user ID: {}", userId);
        List<Address> addresses = addressService.getAddressesByUserId(userId);
        return ResponseEntity.ok(addresses);
    }

    /**
     * Create a new address.
     *
     * @param addressDto Address data
     * @return Created address
     */
    @PostMapping
    public ResponseEntity<Address> createAddress(@Valid @RequestBody AddressDto addressDto) {
        log.info("POST request to add address: {}", addressDto);
        Address address = addressService.addAddress(addressDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(address);
    }

    /**
     * Update an existing address.
     *
     * @param id               ID of the address to update
     * @param updateAddressDto Updated address data
     * @return Updated address
     */
    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAddressDto updateAddressDto) {
        log.info("PUT request to update address ID: {} with data: {}", id, updateAddressDto);
        Address updatedAddress = addressService.updateAddress(id, updateAddressDto);
        return ResponseEntity.ok(updatedAddress);
    }

    /**
     * Delete an address by ID.
     *
     * @param id ID of the address to delete
     * @return No content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        log.info("DELETE request for address ID: {}", id);
        addressService.deleteAddress(id);
        return ResponseEntity.noContent().build();
    }
}
