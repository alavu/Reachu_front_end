package com.ReachU.ServiceBookingSystem.services.company.category;

import com.ReachU.ServiceBookingSystem.dto.CategoryDto;
import com.ReachU.ServiceBookingSystem.entity.Category;

import java.util.List;

public interface CategoryService {

    Category createCategory(CategoryDto CategoryDto);

    List<Category> getAllCategories();
    Category updateCategory(Long id, CategoryDto categoryDto);
    void deleteCategory(Long id);
}
