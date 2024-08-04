package com.ReachU.ServiceBookingSystem.services.company.category;

import com.ReachU.ServiceBookingSystem.dto.SubcategoryDto;
import com.ReachU.ServiceBookingSystem.entity.Category;
import com.ReachU.ServiceBookingSystem.entity.Subcategory;
import com.ReachU.ServiceBookingSystem.repository.CategoryRepository;
import com.ReachU.ServiceBookingSystem.repository.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubcategoryServiceImpl implements SubcategoryService {

    private final SubcategoryRepository subcategoryRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Subcategory createSubcategory(Long categoryId, SubcategoryDto subcategoryDto) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Subcategory subcategory = new Subcategory();
        subcategory.setName(subcategoryDto.getName());
        subcategory.setDescription(subcategoryDto.getDescription());
        subcategory.setCategory(category); // Set the Category on t

        return subcategoryRepository.save(subcategory);
    }

    @Override
    public Subcategory updateSubCategory(Long id, SubcategoryDto subcategoryDto) {
        Subcategory subCategory = subcategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("SubCategory not found"));
        subCategory.setName(subcategoryDto.getName());
        return subcategoryRepository.save(subCategory);
    }

    @Override
    public List<Subcategory> getSubcategoriesByCategoryId(Long categoryId) {
        return subcategoryRepository.findByCategoryId(categoryId);
    }

    @Override
    public void deleteSubCategory(Long id) {
        subcategoryRepository.deleteById(id);
    }
}