package com.ReachU.ServiceBookingSystem.services.partner;

import com.ReachU.ServiceBookingSystem.dto.PartnerDTO;

public interface PartnerService {
    PartnerDTO getPartnerById(Long id);
    PartnerDTO updatePartner(Long id, PartnerDTO partnerDTO);
}
