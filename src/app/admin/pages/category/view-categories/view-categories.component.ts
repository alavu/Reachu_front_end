// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { NzModalService } from 'ng-zorro-antd/modal';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { CategoryService } from 'src/app/admin/services/category.service';
// import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';

// @Component({
//   selector: 'app-view-categories',
//   templateUrl: './view-categories.component.html',
//   styleUrls: ['./view-categories.component.scss']
// })
// export class ViewCategoriesComponent implements OnInit {

//   categories: any[] = [];
//   isEditModalVisible = false;
//   selectedCategory = {
//     id: null,
//     name: '',
//     description: ''
//   };


//   constructor(
//     private category: CategoryService,
//     private modal: NzModalService,
//     private dialog: MatDialog,
//     private notification: NzNotificationService,
//     private router: Router,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.loadCategories();
//   }

//   loadCategories(): void {
//     this.category.categories().subscribe(
//       (data: any) => {
//         this.categories = data;
//         console.log(this.categories);
//       },
//       (error) => {
//         console.log(error);
//         this.modal.error({
//           nzTitle: 'Error!!',
//           nzContent: 'Error in loading data'
//         });
//       }
//     );
//   }

//   openEditModal(category: any): void {
//     const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
//       width: '400px',
//       data: { ...category }
//     });
  
//     // Subscribe to the dialog's afterClosed event to get the result and update the category
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.updateCategory(result);
//       }
//     });
//   }
  
//   handleCancel(): void {
//     this.isEditModalVisible = false;
//   }

//   updateCategory(category: any): void {
//     this.category.updateCategory(category.id, category).subscribe(
//       () => {
//         this.notification.success('Success', 'Category updated successfully');
//         this.loadCategories();
//       },
//       (error) => {
//         console.log(error);
//         this.notification.error('Error', 'Error updating category');
//       }
//     );
//   }
  

//    // Delete category
//    deleteCategory(id: number): void {
//     this.modal.confirm({
//       nzTitle: 'Are you sure you want to delete this category?',
//       nzContent: 'This action cannot be undone.',
//       nzOnOk: () => {
//         this.category.deleteCategory(id).subscribe(
//           () => {
//             this.notification.success('Success', 'Category deleted successfully');
//             // this.category.categories(); // Refresh the categories list
//             this.loadCategories(); 
//           },
//           (error) => {
//             console.log(error);
//             this.notification.error('Error', 'Server error');
//           }
//         );
//       }
//     });
//   }

// }

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from 'src/app/admin/services/category.service';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit {
  categories: any[] = [];
  paginatedCategories: any[] = [];
  isEditModalVisible = false;
  selectedCategory = {
    id: null,
    name: '',
    description: ''
  };
  
  searchQuery: string = ''; // For search functionality
  pageSize = 5; // Default page size
  pageIndex = 0; // Default page index

  constructor(
    private category: CategoryService,
    private modal: NzModalService,
    private dialog: MatDialog,
    private notification: NzNotificationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        this.paginateCategories(); // Paginate the categories after loading them
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        this.modal.error({
          nzTitle: 'Error!!',
          nzContent: 'Error in loading data'
        });
      }
    );
  }

  paginateCategories(): void {
    const filteredCategories = this.categories.filter(category => 
      category.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      category.subCategories.some(subCategory =>
        subCategory.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCategories = filteredCategories.slice(startIndex, endIndex);
  }

  onSearchQueryChange(): void {
    this.pageIndex = 0; // Reset to the first page on search
    this.paginateCategories(); // Filter and paginate based on the search query
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginateCategories();
  }

  openEditModal(category: any): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '400px',
      data: { ...category }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCategory(result);
      }
    });
  }
  
  handleCancel(): void {
    this.isEditModalVisible = false;
  }

  updateCategory(category: any): void {
    this.category.updateCategory(category.id, category).subscribe(
      () => {
        console.log("Category response:", category)
        this.notification.success('Success', 'Category updated successfully');
        this.loadCategories();
      },
      (error) => {
        console.log(error);
        this.notification.error('Error', 'Error updating category');
      }
    );
  }

   deleteCategory(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this category?',
      nzContent: 'This action cannot be undone.',
      nzOnOk: () => {
        this.category.deleteCategory(id).subscribe(
          () => {
            this.notification.success('Success', 'Category deleted successfully');
            this.loadCategories(); 
          },
          (error) => {
            console.log(error);
            this.notification.error('Error', 'Server error');
          }
        );
      }
    });
  }
}


