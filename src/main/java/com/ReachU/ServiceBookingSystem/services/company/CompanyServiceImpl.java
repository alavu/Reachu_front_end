package com.ReachU.ServiceBookingSystem.services.company;

import com.ReachU.ServiceBookingSystem.dto.AdDTO;
import com.ReachU.ServiceBookingSystem.dto.ReservationDTO;

import com.ReachU.ServiceBookingSystem.entity.Ad;
import com.ReachU.ServiceBookingSystem.entity.Category;
import com.ReachU.ServiceBookingSystem.entity.Reservation;
import com.ReachU.ServiceBookingSystem.entity.User;
import com.ReachU.ServiceBookingSystem.enums.ReservationStatus;
import com.ReachU.ServiceBookingSystem.repository.AdRepository;
import com.ReachU.ServiceBookingSystem.repository.CategoryRepository;
import com.ReachU.ServiceBookingSystem.repository.ReservationRepository;
import com.ReachU.ServiceBookingSystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final UserRepository userRepository;
    private final AdRepository adRepository;
    private final ReservationRepository reservationRepository;
    private final CategoryRepository categoryRepository;

    public boolean postAd(Long userId, AdDTO adDTO) throws IOException {
        System.out.println("Received AdDTO: " + adDTO);
        if (userId == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }
        if (adDTO.getCategoryId() == null) {
            throw new IllegalArgumentException("Category ID must not be null");
        }
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            Ad ad = new Ad();
            ad.setServiceName(adDTO.getServiceName());
            ad.setDescription(adDTO.getDescription());
            ad.setImg(adDTO.getImg().getBytes());
            ad.setPrice(adDTO.getPrice());
            ad.setUser(optionalUser.get());

            Optional<Category> categoryOptional = categoryRepository.findById(adDTO.getCategoryId());
            if (categoryOptional.isPresent()) {
                ad.setCategory(categoryOptional.get());
            } else {
                throw new IllegalArgumentException("Invalid Category ID: " + adDTO.getCategoryId());
            }
            adRepository.save(ad);
            return true;
        }
        return false;
    }

    public List<AdDTO> getAllAds(Long userId){
        return adRepository.findAllByUserId(userId).stream().map(Ad::getAdDto).collect(Collectors.toList());
    }

    public AdDTO getAdById(Long adId){
        Optional<Ad> optionalAd = adRepository.findById(adId);
        return optionalAd.map(Ad::getAdDto).orElse(null);
    }

    public boolean updateAd(Long adId, AdDTO adDTO) throws IOException {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        if(optionalAd.isPresent()){
            Ad ad = optionalAd.get();

            ad.setServiceName(adDTO.getServiceName());
            ad.setDescription(adDTO.getDescription());
            ad.setPrice(adDTO.getPrice());

            if(adDTO.getImg() != null){
                ad.setImg(adDTO.getImg().getBytes());
            }

            adRepository.save(ad);
            return true;
        } else{
            return false;
        }
    }

    public boolean deleteAd(Long adId){
        Optional<Ad> optionalAd = adRepository.findById(adId);
        if(optionalAd.isPresent()){
            adRepository.delete(optionalAd.get());
            return true;
        }
        return false;
    }

    public List<ReservationDTO> getAllAdBookings(Long companyId){
        return reservationRepository.findAllByCompanyId(companyId)
                .stream().map(Reservation::getReservationDto).collect(Collectors.toList());
    }

    public boolean changeBookingStatus(Long bookingId, String status){
        Optional<Reservation> optionalReservation = reservationRepository.findById(bookingId);
        if(optionalReservation.isPresent()){
            Reservation existingReservation = optionalReservation.get();
            if(Objects.equals(status,"Approve")){
                existingReservation.setReservationStatus(ReservationStatus.APPROVED);
            }else{
                existingReservation.setReservationStatus(ReservationStatus.REJECTED);
            }

            reservationRepository.save(existingReservation);
            return true;
        }
        return false;
    }
}
