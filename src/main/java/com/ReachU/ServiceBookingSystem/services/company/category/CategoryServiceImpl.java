package com.ReachU.ServiceBookingSystem.services.company.category;

import com.ReachU.ServiceBookingSystem.dto.CategoryDto;
import com.ReachU.ServiceBookingSystem.entity.Category;
import com.ReachU.ServiceBookingSystem.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
        Category category = new Category();
        category.setName(categoryDto.getName());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}

