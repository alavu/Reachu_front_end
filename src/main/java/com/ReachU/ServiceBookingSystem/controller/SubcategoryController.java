package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.dto.SubcategoryDto;
import com.ReachU.ServiceBookingSystem.entity.Subcategory;
import com.ReachU.ServiceBookingSystem.services.company.category.SubcategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class SubcategoryController {

    private final SubcategoryService subcategoryService;

    @PostMapping("subcategory/{categoryId}")
    public ResponseEntity<Subcategory> createSubcategory(@PathVariable Long categoryId, @RequestBody SubcategoryDto subcategoryDto) {
        Subcategory subcategory = subcategoryService.createSubcategory(categoryId,subcategoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(subcategory);
    }

    @GetMapping("subcategories/{categoryId}")
    public ResponseEntity<List<Subcategory>> getAllSubcategories(@PathVariable Long categoryId) {
        return ResponseEntity.ok(subcategoryService.getSubcategoriesByCategoryId(categoryId));
    }

    @PutMapping("subcategories/{id}")
    public ResponseEntity<Subcategory> updateSubCategory(@PathVariable Long id, @RequestBody SubcategoryDto subcategoryDto) {
        return ResponseEntity.ok(subcategoryService.updateSubCategory(id,subcategoryDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubCategory(@PathVariable Long id) {
        subcategoryService.deleteSubCategory(id);
        return ResponseEntity.noContent().build();
    }
}