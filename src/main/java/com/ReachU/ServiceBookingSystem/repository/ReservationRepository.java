package com.ReachU.ServiceBookingSystem.repository;

import com.ReachU.ServiceBookingSystem.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findAllByAdminId(Long adminId);

    List<Reservation> findAllByUserId(Long userId);
}
