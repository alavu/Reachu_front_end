package com.ReachU.ServiceBookingSystem.dto;

import lombok.Data;

@Data
public class SubcategoryDto {

    private Long id;
    private String name;
    private String description;
    private Long categoryId;
//    private Category category;
}
