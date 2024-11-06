package com.ReachU.ServiceBookingSystem.repository;

import com.ReachU.ServiceBookingSystem.entity.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubcategoryRepository  extends JpaRepository<Subcategory, Long> {
    List<Subcategory> findByCategoryId(Long categoryId);
    boolean existsByName(String name);

    Optional<Subcategory> findSubcategoryById(Long id);



    Optional<Subcategory> findSubcategoriesById(Long subcategoryId);
}