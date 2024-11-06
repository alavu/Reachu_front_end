package com.ReachU.ServiceBookingSystem.services.client.clientService;


import com.ReachU.ServiceBookingSystem.dto.AdDTO;
import com.ReachU.ServiceBookingSystem.dto.AdDetailsForClientDTO;
import com.ReachU.ServiceBookingSystem.dto.ReservationDTO;
import com.ReachU.ServiceBookingSystem.dto.ReviewDTO;
import com.ReachU.ServiceBookingSystem.entity.PartnerEntity;
import com.ReachU.ServiceBookingSystem.entity.PaymentUpdateRequest;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Map;

public interface ClientService {

    List<AdDTO> getAllAds();

    List<AdDTO> searchAdByName(String name);

//    boolean bookService(ReservationDTO reservationDTO);

    AdDetailsForClientDTO getAdDetailsByAdId(Long adId);

    List<ReservationDTO> getAllBookingsByUserId(Long userId);

    Boolean giveReview(ReviewDTO reviewDTO);

//    ReservationDTO updateReservationPayment(Long id, PaymentUpdateRequest  request);
    Map<String, Long> bookService(ReservationDTO reservationDTO);
    Map<String, String> updateReservationPayment(Long id, PaymentUpdateRequest request);

    Long getUserIdFromUserDetails(UserDetails userDetails);

//    List<PartnerEntity> getConnectedPartner(Long userId, Long partnerId);

//    List<PartnerEntity> getConnectedPartner(Long userId);
//
//    void saveUserPartnerMapping(Long userId, Long partnerId);
}
