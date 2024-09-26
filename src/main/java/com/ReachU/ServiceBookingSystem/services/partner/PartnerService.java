package com.ReachU.ServiceBookingSystem.services.partner;

import com.ReachU.ServiceBookingSystem.dto.PartnerDTO;
import com.ReachU.ServiceBookingSystem.entity.PartnerEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PartnerService {
    PartnerDTO getPartnerById(Long id);
    PartnerDTO updatePartner(Long id, PartnerDTO partnerDTO, MultipartFile image);
    List<PartnerEntity> getAllPartners();
    PartnerEntity blockPartner(Long id);
    PartnerEntity unblockPartner(Long id);
    PartnerEntity verifyPartner(Long id);
    PartnerEntity rejectPartner(Long id, String rejectionReason);
    List<PartnerDTO> getPartnersByService(String service);
}
