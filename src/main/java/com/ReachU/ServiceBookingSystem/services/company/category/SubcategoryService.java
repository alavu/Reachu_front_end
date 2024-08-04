package com.ReachU.ServiceBookingSystem.services.company.category;

import com.ReachU.ServiceBookingSystem.dto.SubcategoryDto;
import com.ReachU.ServiceBookingSystem.entity.Subcategory;

import java.util.List;

public interface SubcategoryService {

    Subcategory createSubcategory(Long categoryId, SubcategoryDto subcategoryDto);

    Subcategory updateSubCategory(Long id, SubcategoryDto subcategoryDto);

    void deleteSubCategory(Long id);

    List<Subcategory> getSubcategoriesByCategoryId(Long categoryId);
}
