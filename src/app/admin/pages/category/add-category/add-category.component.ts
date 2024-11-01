// import { Component, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { CategoryService } from 'src/app/admin/services/category.service';

// @Component({
//   selector: 'app-add-category',
//   templateUrl: './add-category.component.html',
//   styleUrls: ['./add-category.component.scss']
// })
// export class AddCategoryComponent implements OnInit {
//   category = {
//     name: '',
//     description: ''
//   };

//   constructor(
//     private categoryService: CategoryService,
//     private snackBar: MatSnackBar,
//     private notification: NzNotificationService,
//     private router: Router,
//     private route: ActivatedRoute,
//   ) { }

//   ngOnInit(): void {
//     // this.route.params.subscribe(params => {
//     //   const id = params['id'];
//     //   if (id) {
//     //     this.isEditMode = true;
//     //     // this.loadCategory(id);
//     //   }
//     // });
//   }

//   formSubmit(): void {
//     if (this.category.name.trim() === '' || this.category.name === null) {
//       this.snackBar.open('Title Required !!', '', {
//         duration: 3000
//       });
//       return;
//     }



//     // Check if the category name already exists
//     this.categoryService.checkCategoryNameExists(this.category.name).subscribe(
//       (exists: boolean) => {
//         if (exists) {
//           this.snackBar.open('Category name already exists! Please choose a unique name.', '', {
//             duration: 3000
//           });
//         } else {
//           this.categoryService.addCategory(this.category).subscribe(
//             (data: any) => {
//               this.category.name = '';
//               this.category.description = '';
//               this.notification.success('Success', 'Category is added successfully');
//               this.router.navigateByUrl('/admin/categories');
//             },
//             (error) => {
//               console.log(error);
//               this.notification.error('Error', 'Server error');
//             }
//           );
//         }
//       },
//       (error) => {
//         console.log(error);
//         this.notification.error('Error', 'Server error while checking category name');
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from 'src/app/admin/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  category: Category = {
    name: '',
    description: ''
  };

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  formSubmit(): void {
    if (this.category.name.trim() === '' || this.category.name === null) {
      this.snackBar.open('Title Required !!', '', {
        duration: 3000
      });
      return;
    }

    // Check if the category name already exists
    this.categoryService.checkCategoryNameExists(this.category.name).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.snackBar.open('Category name already exists! Please choose a unique name.', '', {
            duration: 3000
          });
        } else {
          this.categoryService.addCategory(this.category).subscribe(
            (data: any) => {
              this.category.name = '';
              this.category.description = '';
              this.notification.success('Success', 'Category is added successfully');
              this.router.navigateByUrl('/admin/categories');
            },
            (error) => {
              console.log(error);
              this.notification.error('Error', 'Server error while adding the category');
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

export interface Category {
  name: string;
  description: string;
}
