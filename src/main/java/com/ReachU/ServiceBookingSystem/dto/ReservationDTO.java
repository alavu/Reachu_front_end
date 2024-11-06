package com.ReachU.ServiceBookingSystem.dto;

import com.ReachU.ServiceBookingSystem.enums.ReservationStatus;
import com.ReachU.ServiceBookingSystem.enums.ReviewStatus;
import lombok.Data;

import java.util.Date;

@Data
public class ReservationDTO {

    private Long id;

    private Date bookDate;

    private String serviceName;

    private ReservationStatus reservationStatus;

    private ReviewStatus reviewStatus;

    private Long userId;

    private String userName;

    private Long adminId;

    private Long adId;

    private String paymentMode;

    private String paymentStatus;

}
