// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Category } from '../pages/model/Category';

// const BASIC_URL = "http://localhost:8080/api/category/";

// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryService {

//   constructor(private http: HttpClient) { }

//   // get all category
//    public categories() {
//     return this.http.get(BASIC_URL + 'categories')
//   }

//   // add new category
//   public addCategory(category) {
//     return this.http.post(BASIC_URL + 'category', category)
//   }

//     // Update category
//     public updateCategory(id: number, category: any): Observable<any> {
//       return this.http.put(`${BASIC_URL}update/category/${id}`, category);
//     }

//   // Delete category
//    public deleteCategory(id: number): Observable<void> {
//   return this.http.delete<void>(`${BASIC_URL}delete/category/${id}`);
// }

//   // get category by id
//   public getCategoryById(id: number): Observable<Category> {
//     return this.http.get<Category>(`${BASIC_URL}categories/${id}`);
//   }

// // Method to check if category name exists
// checkCategoryNameExists(name: string): Observable<boolean> {
//   return this.http.get<boolean>(`${BASIC_URL}exists/${name}`);
// }

// // Method to check if sub category name exists
// checkSubCategoryNameExists(name: string): Observable<boolean> {
//   return this.http.get<boolean>(`${BASIC_URL}subcategory/exists/${name}`);
// }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../pages/model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) { }

  addCategory(data: any): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/category`, data);
  }

  categories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/update/category/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/category/${id}`);
  }

  checkCategoryNameExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/${name}`);
  }


  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }
}
