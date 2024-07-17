package com.ReachU.ServiceBookingSystem.dto;

import lombok.Data;

import java.util.List;

@Data
public class AdDetailsForClientDTO {

    private AdDTO adDTO;

    private List<ReviewDTO> reviewDTOList;
}
