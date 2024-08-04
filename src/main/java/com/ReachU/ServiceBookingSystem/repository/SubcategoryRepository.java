package com.ReachU.ServiceBookingSystem.repository;

import com.ReachU.ServiceBookingSystem.entity.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubcategoryRepository  extends JpaRepository<Subcategory, Long> {
    List<Subcategory> findByCategoryId(Long categoryId);
}
