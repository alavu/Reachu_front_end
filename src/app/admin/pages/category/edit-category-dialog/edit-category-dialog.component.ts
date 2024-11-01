import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // To display error messages
import { CategoryService } from 'src/app/admin/services/category.service';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
})
export class EditCategoryDialogComponent {
  isSaving = false;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.isSaving = true;

    this.categoryService.checkCategoryNameExists(this.data.name).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.isSaving = false;
          this.snackBar.open('Category name already exists. Please choose a different name.', 'Close', {
            duration: 3000,
          });
        } else {
          this.dialogRef.close(this.data); // Pass the updated data back to the parent component
        }
      },
      (error) => {
        this.isSaving = false;
        this.snackBar.open('An error occurred while checking the category name.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
