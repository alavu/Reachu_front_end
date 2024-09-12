package com.ReachU.ServiceBookingSystem.services.partner;

import com.ReachU.ServiceBookingSystem.dto.PartnerDTO;
import com.ReachU.ServiceBookingSystem.entity.PartnerEntity;
import com.ReachU.ServiceBookingSystem.repository.PartnerRepository;
import jakarta.mail.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PartnerServiceImpl implements PartnerService{

    @Autowired
    private PartnerRepository partnerRepository;

    // Fetch partner by ID
    public PartnerDTO getPartnerById(Long id) {
        Optional<PartnerEntity> partnerEntity = partnerRepository.findById(id);
        if (partnerEntity.isPresent()) {
            PartnerDTO partnerDTO = new PartnerDTO();
            partnerDTO.setId(partnerEntity.get().getId());
            partnerDTO.setName(partnerEntity.get().getName());
            partnerDTO.setLastname(partnerEntity.get().getLastname());
            partnerDTO.setEmail(partnerEntity.get().getEmail());
            partnerDTO.setPhone(partnerEntity.get().getPhone());
            partnerDTO.setService(partnerEntity.get().getService());
            return partnerDTO;
        } else {
            throw new RuntimeException("Partner not found with ID: " + id);
        }
    }

    @Override
    public PartnerDTO updatePartner(Long id, PartnerDTO partnerDTO) {
        PartnerEntity existingPartner =  partnerRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Partner not found with ID: " + id));
        existingPartner.setName(partnerDTO.getName());
        existingPartner.setLastname(partnerDTO.getLastname());
        existingPartner.setEmail(partnerDTO.getEmail());
        existingPartner.setPhone(partnerDTO.getPhone());
        existingPartner.setService(partnerDTO.getService());

        PartnerEntity updatedPartner = partnerRepository.save(existingPartner);
        return mapToDTO(updatedPartner);
    }

    // Method to map entity to DTO
    private PartnerDTO mapToDTO(PartnerEntity partner) {
        PartnerDTO partnerDTO = new PartnerDTO();
        partnerDTO.setId(partner.getId());
        partnerDTO.setName(partner.getName());
        partnerDTO.setPhone(partner.getPhone());
        partnerDTO.setEmail(partner.getEmail());
        partnerDTO.setService(partner.getService());
        return partnerDTO;
    }
}
