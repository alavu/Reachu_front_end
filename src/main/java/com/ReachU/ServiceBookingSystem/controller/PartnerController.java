package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.dto.PartnerDTO;
import com.ReachU.ServiceBookingSystem.dto.RejectPartnerRequest;
import com.ReachU.ServiceBookingSystem.entity.PartnerEntity;
import com.ReachU.ServiceBookingSystem.services.partner.PartnerServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/api/partners")
public class PartnerController {

    @Autowired
    private PartnerServiceImpl partnerService;

    @GetMapping("/{id}")
    public ResponseEntity<PartnerDTO> getPartnerById(@PathVariable Long id) {
        PartnerDTO partner = partnerService.getPartnerById(id);
        return ResponseEntity.ok(partner);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePartner(
            @PathVariable("id") Long partnerId,
            @ModelAttribute PartnerDTO partnerDTO,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            // Update partner with the given data
            PartnerDTO updatedPartner = partnerService.updatePartner(partnerId, partnerDTO, image);
            return new ResponseEntity<>(updatedPartner, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<PartnerEntity>> getAllPartner() {
    List<PartnerEntity> partners = partnerService.getAllPartners();
    return ResponseEntity.ok(partners);
    }

    @PutMapping("/block/{id}")
    public ResponseEntity<?>  blockUser(@PathVariable Long id) {
        var partner = partnerService.blockPartner(id);
        if (partner == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        System.out.println("Blocked data -> " + partner);
        return ResponseEntity.ok(partner);
    }

    @PutMapping("/unblock/{id}")
    public ResponseEntity<?> unblockUser(@PathVariable Long id) {
        var partner = partnerService.unblockPartner(id);
        if (partner == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        System.out.println("unblocked data -> " + partner);
        return ResponseEntity.ok(partner);
    }

    @PutMapping("/verify-partner/{id}")
    public ResponseEntity<?> verifyPartner(@PathVariable Long id){
        try {
            var partner = partnerService.verifyPartner(id);
            if (partner == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Partner not found");
            }
            return ResponseEntity.ok(partner);
        }  catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/reject-partner/{id}")
    public ResponseEntity<PartnerEntity> rejectPartner(@PathVariable Long id,
                                                       @RequestBody RejectPartnerRequest request) {
        PartnerEntity rejectedPartner = partnerService.rejectPartner(id, request.getRejectionReason());
        return ResponseEntity.ok(rejectedPartner);
    }

    @GetMapping("/byService/{service}")
    public ResponseEntity<List<PartnerDTO>> getPartnersByService(@PathVariable String service) {
        List<PartnerDTO> partners = partnerService.getPartnersByService(service);
        return ResponseEntity.ok(partners);
    }
}
