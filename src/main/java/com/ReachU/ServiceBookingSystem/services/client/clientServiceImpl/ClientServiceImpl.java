package com.ReachU.ServiceBookingSystem.services.client.clientServiceImpl;

import com.ReachU.ServiceBookingSystem.dto.AdDTO;
import com.ReachU.ServiceBookingSystem.dto.AdDetailsForClientDTO;
import com.ReachU.ServiceBookingSystem.dto.ReservationDTO;
import com.ReachU.ServiceBookingSystem.dto.ReviewDTO;
import com.ReachU.ServiceBookingSystem.entity.*;
import com.ReachU.ServiceBookingSystem.enums.ReservationStatus;
import com.ReachU.ServiceBookingSystem.enums.ReviewStatus;
import com.ReachU.ServiceBookingSystem.exceptions.ResourceNotFoundException;
import com.ReachU.ServiceBookingSystem.repository.*;
import com.ReachU.ServiceBookingSystem.services.client.clientService.ClientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private AdRepository adRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private PartnerRepository partnerRepository;

//    @Autowired
//    private UserPartnerMappingRepository userPartnerMappingRepository;


    @Override
    public List<AdDTO> getAllAds() {
        return adRepository.findAll().stream().map(Ad::getAdDto).collect(Collectors.toList());
    }

    @Override
    public List<AdDTO> searchAdByName(String name) {
        return adRepository.findAllByServiceNameContaining(name).stream().map(Ad::getAdDto).collect(Collectors.toList());
    }

//    @Override
//    public boolean bookService(ReservationDTO reservationDTO){
//        Optional<Ad> optionalAd = adRepository.findById(reservationDTO.getAdId());
//        Optional<User> optionalUser = userRepository.findById(reservationDTO.getUserId());
//
//        if(optionalAd.isPresent() && optionalUser.isPresent()){
//            Reservation reservation = new Reservation();
//
//            reservation.setBookDate(reservationDTO.getBookDate());
//            reservation.setReservationStatus(ReservationStatus.PENDING);
//            reservation.setUser(optionalUser.get());
//
//            reservation.setAd(optionalAd.get());
//            reservation.setAdmin(optionalAd.get().getUser());
//            reservation.setReviewStatus(ReviewStatus.FALSE);
//
//            reservationRepository.save(reservation);
//            return true;
//        }
//        return false;
//    }

    @Override
    public Map<String, Long> bookService(ReservationDTO reservationDTO) {
        Optional<Ad> optionalAd = adRepository.findById(reservationDTO.getAdId());
        Optional<User> optionalUser = userRepository.findById(reservationDTO.getUserId());

        if (optionalAd.isPresent() && optionalUser.isPresent()) {
            Reservation reservation = new Reservation();
            reservation.setBookDate(reservationDTO.getBookDate());
            reservation.setReservationStatus(ReservationStatus.PENDING);
            reservation.setUser(optionalUser.get());
            reservation.setAd(optionalAd.get());
            reservation.setAdmin(optionalAd.get().getUser());
            reservation.setReviewStatus(ReviewStatus.FALSE);
            reservationRepository.save(reservation);

            // Return reservationId
            return Map.of("reservationId", reservation.getId());
        }
        throw new ResourceNotFoundException("Ad or User not found");
    }


    @Override
    public AdDetailsForClientDTO getAdDetailsByAdId(Long adId){
        Optional<Ad> optionalAd = adRepository.findById(adId);
        AdDetailsForClientDTO adDetailsForClientDTO = new AdDetailsForClientDTO();
        if(optionalAd.isPresent()){
            adDetailsForClientDTO.setAdDTO(optionalAd.get().getAdDto());

            List<Review> reviewList = reviewRepository.findAllByAdId(adId);
            adDetailsForClientDTO.setReviewDTOList(reviewList.stream().map(Review::getDto).collect(Collectors.toList()));
        }
        return adDetailsForClientDTO;
    }

    @Override
    public List<ReservationDTO> getAllBookingsByUserId(Long userId){
        return reservationRepository.findAllByUserId(userId).stream().map(Reservation::getReservationDto).collect(Collectors.toList());
    }

//    @Override
//    public ReservationDTO updateReservationPayment(Long id, PaymentUpdateRequest request)
//    {
//        Reservation reservation = reservationRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));
//
//        reservation.setPaymentMode(request.getPaymentMode());
//        reservation.setPaymentStatus(request.getPaymentStatus());
//        return reservationRepository.save(reservation).getReservationDto();
//    }

    @Override
    public Map<String, String> updateReservationPayment(Long id, PaymentUpdateRequest request) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);

        if (optionalReservation.isPresent()) {
            Reservation reservation = optionalReservation.get();
            reservation.setPaymentMode(request.getPaymentMode());
            reservation.setPaymentStatus(request.getPaymentStatus());
            reservationRepository.save(reservation);

            return Map.of("message", "Payment updated successfully");
        } else {
            throw new ResourceNotFoundException("Reservation not found with id: " + id);
        }
    }

    @Override
    public Boolean giveReview(ReviewDTO reviewDTO){
        Optional<User> optionalUser = userRepository.findById(reviewDTO.getUserId());
        Optional<Reservation> optionalBooking = reservationRepository.findById(reviewDTO.getBookId());

        if(optionalUser.isPresent() && optionalBooking.isPresent()){
            Review review = new Review();

            review.setReviewDate(new Date());
            review.setReview(reviewDTO.getReview());
            review.setRating(reviewDTO.getRating());

            review.setUser(optionalUser.get());
            review.setAd(optionalBooking.get().getAd());

            reviewRepository.save(review);

            Reservation booking = optionalBooking.get();
            booking.setReviewStatus(ReviewStatus.TRUE);

            reservationRepository.save(booking);

            return true;
        }
        return false;
    }

    @Override
    public Long getUserIdFromUserDetails(UserDetails userDetails) {
        String username = userDetails.getUsername();
        System.out.println(username + " username");
        Optional<User> userEntity = userRepository.findFirstByEmail(username);
        if (userEntity.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        return userEntity.get().getId();
    }

//    @Override
//    public List<PartnerEntity> getConnectedPartner(Long userId, Long partnerId) {
//    User user = userRepository.findById(userId).orElseThrow(() ->
//    new ResourceNotFoundException("User not found with id "));
//    PartnerEntity partner = partnerRepository.findById(partnerId).orElseThrow(() ->
//    new ResourceNotFoundException("Partner not found with id "));
//        // Fetch the mapping
//        UserPartnerMapping mapping = userPartnerMappingRepository.findByUserAndPartner(user, partner);
//        if (mapping != null) {
//            return List.of(partner); // Return the partner if connected
//        }
//    return Collections.emptyList(); // Return an empty list if no connection is found
//    }

//    @Override
//    public List<PartnerEntity> getConnectedPartner(Long userId) {
//        User user = userRepository.findById(userId).orElseThrow(() ->
//                new ResourceNotFoundException("User not found with id " + userId));
//        // Fetch all mappings for the user
//        List<UserPartnerMapping> mappings = userPartnerMappingRepository.findByUser(user);
//
//        // Extract and return all connected partners
//        if (!mappings.isEmpty()) {
//            return mappings.stream()
//                    .map(UserPartnerMapping::getPartner) // Assuming you have a getPartner() method in the UserPartnerMapping class
//                    .collect(Collectors.toList());
//        }
//        return Collections.emptyList(); // Return an empty list if no connections are found
//    }
//
//
//    @Override
//    public void saveUserPartnerMapping(Long userId, Long partnerId) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
//
//        PartnerEntity partner = partnerRepository.findById(partnerId)
//                .orElseThrow(() -> new ResourceNotFoundException("Partner not found with id " + partnerId));
//
//        UserPartnerMapping mapping = new UserPartnerMapping();
//        mapping.setUser(user);
//        mapping.setPartner(partner);
//
//        userPartnerMappingRepository.save(mapping);
//    }
}
