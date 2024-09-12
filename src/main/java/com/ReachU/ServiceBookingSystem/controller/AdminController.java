package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.dto.AdDTO;
import com.ReachU.ServiceBookingSystem.dto.ReservationDTO;
import com.ReachU.ServiceBookingSystem.services.company.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/ad/{userId}")
    public ResponseEntity<?> postService(@AuthenticationPrincipal UserDetails userDetails, @ModelAttribute AdDTO adDTO) throws IOException {
        Long userId = companyService.getAdminIdFromUserDetails(userDetails);

        boolean success = companyService.postService(userId, adDTO);
        if(success){
            return ResponseEntity.status(HttpStatus.OK).build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/ads/{userId}")
    public ResponseEntity<?> getAllAdsByUserId(@AuthenticationPrincipal UserDetails userDetails){
        Long userId = companyService.getAdminIdFromUserDetails(userDetails);
        return ResponseEntity.ok(companyService.getAllAds(userId));
    }

    @GetMapping("/ad/{adId}")
    public ResponseEntity<?> getAdById(@PathVariable Long adId){
        AdDTO adDTO = companyService.getAdById(adId);
        if(adDTO != null){
            return ResponseEntity.ok(adDTO);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/ad/{adId}")
    public ResponseEntity<?> updateAd(@PathVariable Long adId, @ModelAttribute AdDTO adDTO) throws IOException {
        boolean success = companyService.updateAd(adId, adDTO);
        if(success){
            return ResponseEntity.status(HttpStatus.OK).build();
        } else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/ad/{adId}")
    public ResponseEntity<?> deleteAd(@PathVariable Long adId){
        boolean success = companyService.deleteAd(adId);
        if(success){
            return ResponseEntity.status(HttpStatus.OK).build();
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/bookings/{companyId}")
    public ResponseEntity<List<ReservationDTO>> getAllAdBookings(@PathVariable Long companyId){
        return ResponseEntity.ok(companyService.getAllAdBookings(companyId));
    }

    @GetMapping("/booking/{bookingId}/{status}")
    public ResponseEntity<?> changeBookingStatus(@PathVariable Long bookingId, @PathVariable String status){
        boolean success = companyService.changeBookingStatus(bookingId, status);
        if(success) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }
}
