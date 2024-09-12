package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.dto.PartnerDTO;
import com.ReachU.ServiceBookingSystem.services.partner.PartnerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/partners")
public class PartnerController {

    @Autowired
    private PartnerServiceImpl partnerService;

    // Endpoint to get partner by ID
    @GetMapping("/{id}")
    public ResponseEntity<PartnerDTO> getPartnerById(@PathVariable Long id) {
        PartnerDTO partner = partnerService.getPartnerById(id);
        return ResponseEntity.ok(partner);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePartner(@PathVariable Long id, @RequestBody PartnerDTO partnerDTO) {
      try {
          PartnerDTO updatedPartner = partnerService.updatePartner(id, partnerDTO);
          return ResponseEntity.ok(updatedPartner);
      }
      catch (Exception e) {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update partner: " + e.getMessage());
      }
    }
}
