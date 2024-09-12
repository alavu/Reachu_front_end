package com.ReachU.ServiceBookingSystem.services.company.category;

import com.ReachU.ServiceBookingSystem.dto.CategoryDto;
import com.ReachU.ServiceBookingSystem.entity.Category;
import com.ReachU.ServiceBookingSystem.exceptions.ResourceNotFoundException;
import com.ReachU.ServiceBookingSystem.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CategoryDto CategoryDto) {
        Category category = new Category();
        category.setName(CategoryDto.getName());
        category.setDescription(CategoryDto.getDescription());
        System.out.println("Category created"+ category.getName());

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category updateCategory(Long id, CategoryDto categoryDto) {
        // Fetch the existing category from the database
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));

        // Update the existing category's fields
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());

        // Save the updated category back to the database
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public boolean checkCategoryNameExists(String name) {
        return categoryRepository.existsByName(name);
    }

    @Override
    public Category getCategoryById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + id));
    }
}

