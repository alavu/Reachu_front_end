package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.dto.ReservationDTO;
import com.ReachU.ServiceBookingSystem.dto.ReviewDTO;
import com.ReachU.ServiceBookingSystem.entity.PartnerEntity;
import com.ReachU.ServiceBookingSystem.entity.PaymentUpdateRequest;
import com.ReachU.ServiceBookingSystem.exceptions.ResourceNotFoundException;
import com.ReachU.ServiceBookingSystem.services.client.clientService.ClientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/ads")
    public ResponseEntity<?> getAllAds(){
        return ResponseEntity.ok(clientService.getAllAds());
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<?> searchAdByService(@PathVariable String name){
        return ResponseEntity.ok(clientService.searchAdByName(name));
    }

//    @PostMapping("/book-service")
//    public ResponseEntity<?> bookService(@RequestBody ReservationDTO reservationDTO){
//        boolean success = clientService.bookService(reservationDTO);
//        if(success){
//            return ResponseEntity.status(HttpStatus.OK).build();
//        }else{
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    }

    @PostMapping("/book-service")
    public ResponseEntity<?> bookService(@RequestBody ReservationDTO reservationDTO) {
        try {
            Map<String, Long> response = clientService.bookService(reservationDTO);
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/ad/{adId}")
    public ResponseEntity<?> getAdDetailsByAdId(@PathVariable Long adId){
        return ResponseEntity.ok(clientService.getAdDetailsByAdId(adId));
    }

    @GetMapping("/my-bookings/{userId}")
    public ResponseEntity<?> getAllBookingsByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(clientService.getAllBookingsByUserId(userId));
    }

//    @PutMapping("/reservations/{id}/payment")
//    public ResponseEntity<?> updateReservationPayment(@PathVariable Long id, @RequestBody PaymentUpdateRequest request) {
//        return ResponseEntity.ok(clientService.updateReservationPayment(id, request));
//    }
    @PutMapping("/{id}/payment")
    public ResponseEntity<?> updateReservationPayment(@PathVariable Long id, @RequestBody PaymentUpdateRequest request) {
    try {
        Map<String, String> response = clientService.updateReservationPayment(id, request);
        return ResponseEntity.ok(response);
    } catch (ResourceNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}

    @PostMapping("/review")
    public ResponseEntity<?> giveReview(@RequestBody ReviewDTO reviewDTO){
        Boolean success = clientService.giveReview(reviewDTO);
        if(success){
            return ResponseEntity.status(HttpStatus.OK).build();
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

//    @GetMapping("/partner/{partnerId}")
//    public ResponseEntity<List<PartnerEntity>> getConnectedPartner(@AuthenticationPrincipal UserDetails userdetails, @PathVariable Long partnerId) {
//        Long userId = clientService.getUserIdFromUserDetails(userdetails);
//        System.out.println("User details"+userId);
//        List<PartnerEntity> connectedPartners = clientService.getConnectedPartner(userId, partnerId);
//        System.out.println("Connected partner"+connectedPartners);
//        // Check if any connected partner was found
//        if (connectedPartners.isEmpty()) {
//            return ResponseEntity.notFound().build(); // No partner connected, return 404
//        }
//
//        return ResponseEntity.ok(connectedPartners); // Return the list of connected partners
//    }

//    @GetMapping("/partner")
//    public ResponseEntity<List<PartnerEntity>> getConnectedPartner(@AuthenticationPrincipal UserDetails userdetails) {
//        Long userId = clientService.getUserIdFromUserDetails(userdetails);
//        System.out.println("User details"+userId);
//        List<PartnerEntity> connectedPartners = clientService.getConnectedPartner(userId);
//        System.out.println("Connected partner"+connectedPartners);
//        // Check if any connected partner was found
//        if (connectedPartners.isEmpty()) {
//            return ResponseEntity.notFound().build(); // No partner connected, return 404
//        }
//
//        return ResponseEntity.ok(connectedPartners); // Return the list of connected partners
//    }
//
//    @PostMapping("/partners/{partnerId}")
//    public ResponseEntity<Void> connectPartnerToUser(
//            @AuthenticationPrincipal UserDetails userdetails,
//            @PathVariable Long partnerId) {
//        Long userId = clientService.getUserIdFromUserDetails(userdetails);
//        clientService.saveUserPartnerMapping(userId, partnerId);
//        return ResponseEntity.ok().build(); // Successfully saved the mapping
//    }
}
