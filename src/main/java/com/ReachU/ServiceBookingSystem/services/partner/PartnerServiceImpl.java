package com.ReachU.ServiceBookingSystem.services.partner;

import com.ReachU.ServiceBookingSystem.dto.PartnerDTO;
import com.ReachU.ServiceBookingSystem.entity.PartnerEntity;
import com.ReachU.ServiceBookingSystem.exceptions.ResourceNotFoundException;
import com.ReachU.ServiceBookingSystem.repository.PartnerRepository;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PartnerServiceImpl implements PartnerService {

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
            partnerDTO.setImg(partnerEntity.get().getImg());
            return partnerDTO;
        } else {
            throw new RuntimeException("Partner not found with ID: " + id);
        }
    }

    @Override
    public PartnerDTO updatePartner(Long id, PartnerDTO partnerDTO, MultipartFile image) throws IOException {
        PartnerEntity existingPartner = partnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner not found with ID: " + id));
        existingPartner.setName(partnerDTO.getName());
//        existingPartner.setLastname(partnerDTO.getLastname());
        existingPartner.setEmail(partnerDTO.getEmail());
        existingPartner.setPhone(partnerDTO.getPhone());
        existingPartner.setService(partnerDTO.getService());

        // Handle image file
        if (image != null && !image.isEmpty()) {
            try {
                existingPartner.setImg(image.getBytes()); // Set the image bytes
            } catch (IOException | java.io.IOException e) {
                throw new RuntimeException("Failed to process image file", e);
            }
        }

        PartnerEntity updatedPartner = partnerRepository.save(existingPartner);
        // Return the updated PartnerDTO
        return mapEntityToDto(updatedPartner);
    }

    // Helper method to map PartnerEntity to PartnerDTO
    private PartnerDTO mapEntityToDto(PartnerEntity partnerEntity) {
        PartnerDTO partnerDTO = new PartnerDTO();
        partnerDTO.setId(partnerEntity.getId());
        partnerDTO.setName(partnerEntity.getName());
//        partnerDTO.setLastname(partnerEntity.getLastname());
        partnerDTO.setEmail(partnerEntity.getEmail());
        partnerDTO.setPhone(partnerEntity.getPhone());
        partnerDTO.setService(partnerEntity.getService());
        partnerDTO.setImg(partnerEntity.getImg());

        return partnerDTO;
    }

    @Override
    public List<PartnerEntity> getAllPartners() {
        return partnerRepository.findAll()
                .stream()
                .peek(partner -> System.out.println("Fetch Partner " + partner))
                .toList();
    }

    @Override
    public PartnerEntity blockPartner(Long id) {
        PartnerEntity partner = partnerRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        partner.setBlocked(true);
        partnerRepository.save(partner);
        return partner;
    }

    @Override
    public PartnerEntity unblockPartner(Long id) {
        PartnerEntity partner = partnerRepository.findById(id).orElseThrow(() -> new RuntimeException("Partner not found"));
        partner.setBlocked(false);
        partnerRepository.save(partner);
        return partner;
    }

    public PartnerEntity verifyPartner(Long id) {
        PartnerEntity partner = partnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner not found with ID: " + id));
        partner.setVerified(true);
        partnerRepository.save(partner);
        return partner;
    }

    public PartnerEntity rejectPartner(Long partnerId, String rejectionReason) {
        Optional<PartnerEntity> partnerOptional = partnerRepository.findById(partnerId);
        if (partnerOptional.isPresent()) {
            PartnerEntity partner = partnerOptional.get();
            partner.setRejected(true);
            partner.setRejectionReason(rejectionReason);
            return partnerRepository.save(partner);
        } else {
            throw new ResourceNotFoundException("Partner not found with id: " + partnerId);
        }
    }

    @Override
    public List<PartnerDTO> getPartnersByService(String service) {
        System.out.println("Service being queried: " + service.trim());
        List<PartnerEntity> partners = partnerRepository.findByService(service.trim());
         return partners.stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }
}