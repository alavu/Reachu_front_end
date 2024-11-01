import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { CategoryService } from 'src/app/admin/services/category.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subcategory } from 'src/app/company/model/Subcategory';
import { SubCategoryService } from 'src/app/admin/services/sub-category-service.service';

@Component({
  selector: 'app-subcategory-component',
  templateUrl: './subcategory-component.component.html',
  styleUrls: ['./subcategory-component.component.scss']
})
export class SubcategoryComponent implements OnInit {

//     subcategoryForm!: FormGroup;
//     categoryId!: number;

//     constructor(
//         private fb: FormBuilder,
//         private router: Router,
//         private snackBar: MatSnackBar,
//         private subcategoryService: SubcategoryService,
//         private route: ActivatedRoute
//     ) { }

//     ngOnInit(): void {
//         this.route.params.subscribe(params => {
//             this.categoryId = params['categoryId'];
//         });

//         this.subcategoryForm = this.fb.group({
//             name: [null, [Validators.required]],
//             description: [null, [Validators.required]],
//             categoryId: [this.categoryId, [Validators.required]]
//         });
//     }

//     addSubcategory(): void {
//         if (this.subcategoryForm.valid) {
//             this.subcategoryService.createSubcategory(this.subcategoryForm.value).subscribe((res) => {
//                 this.snackBar.open('Subcategory Posted Successfully!', 'Close', {
//                     duration: 5000
//                 });
//                 this.router.navigateByUrl('/company/dashboard');
//             }, err => {
//                 this.snackBar.open('Error posting subcategory', 'Close', {
//                     duration: 5000,
//                     panelClass: 'error-snackbar'
//                 });
//             });
//         } else {
//             this.subcategoryForm.markAllAsTouched();
//         }
//     }

// }

subCategory: Partial<Subcategory> = {
    id: null,  // Optional, can be omitted if not required
    name: '',
    description: '',
    parentCategoryId: null
  };
  

  categories: any[] = [];  // To store parent categories

  constructor(
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loadCategories();  // Load categories on component initialization
  }

  loadCategories(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
        this.notification.error('Error', 'Failed to load categories');
      }
    );
  }

  formSubmit(): void {
    if (this.subCategory.name.trim() === '' || this.subCategory.name === null) {
      this.snackBar.open('Sub-Category Title Required !!', '', {
        duration: 3000
      });
      return;
    }

    // Check if the category name already exists
    this.subCategoryService.checkSubCategoryNameExists(this.subCategory.name).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.snackBar.open('Sub Category name already exists! Please choose a unique name.', '', {
            duration: 3000
          });
        }
        else {

    const categoryId = this.subCategory.parentCategoryId;

    this.subCategoryService.createSubcategory(this.subCategory, categoryId).subscribe(
      (data: any) => {
        console.log('Response Data:', data);
        this.subCategory.name = '';
        this.subCategory.description = '';
        this.subCategory.parentCategoryId = null;
        this.notification.success('Success', 'Sub-Category is added successfully');
        this.router.navigateByUrl('/admin/categories');
      },
      (error) => {
        console.log(error);
        this.notification.error('Error', 'Server error');
      }
    );
  }
},
(error) => {
  console.log(error);
  this.notification.error('Error', 'Server error while checking category name');
}
);
}
}
