package com.ReachU.ServiceBookingSystem.services.client.addressService;

import java.util.List;

import com.ReachU.ServiceBookingSystem.dto.AddressDto;
import com.ReachU.ServiceBookingSystem.dto.UpdateAddressDto;
import com.ReachU.ServiceBookingSystem.entity.Address;

public interface AddressService {

    List<Address> getAddressesByUserId(Long userId);

    Address addAddress(AddressDto addressDto);

    Address updateAddress(Long id, UpdateAddressDto updateAddressDto);

    void deleteAddress(Long id);
}
