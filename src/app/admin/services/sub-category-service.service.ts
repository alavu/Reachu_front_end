import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '../pages/model/Category';

const BASIC_URL = 'http://localhost:8080/api/admin';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService { 

  constructor(private http: HttpClient) { }

  // Create subcategory
  createSubcategory(subcategory: Partial<Subcategory>, categoryId: number): Observable<Subcategory> {
    return this.http.post<Subcategory>(`${BASIC_URL}/subcategory/${categoryId}`, subcategory);
  }
  // Get all subcategories by category ID
  getSubCategoriesByCategoryId(categoryId: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/subcategories/${categoryId}`);
  }

  // Update subcategory
  updateSubCategory(id: number, subCategory: any): Observable<any> {
    return this.http.put(`${BASIC_URL}/subcategories/${id}`, subCategory);
  }

  // Delete subcategory
  deleteSubCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${BASIC_URL}/subcategories/${id}`);
  }

    // Method to check if sub category name exists
checkSubCategoryNameExists(name: string): Observable<boolean> {
  return this.http.get<boolean>(`${BASIC_URL}/subcategory/exists/${name}`);
}
}
