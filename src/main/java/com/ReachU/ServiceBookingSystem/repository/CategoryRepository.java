package com.ReachU.ServiceBookingSystem.repository;

import com.ReachU.ServiceBookingSystem.dto.CategoryDto;
import com.ReachU.ServiceBookingSystem.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
