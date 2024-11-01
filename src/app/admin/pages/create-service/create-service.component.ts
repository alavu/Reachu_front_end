import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-create-service',
    templateUrl: './create-service.component.html',
    styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent {

    selectedFile: File | null;
    imagePreview: string | ArrayBuffer | null;
    validateForm!: FormGroup;
    listofCategories: any = [];
    listOfSubCategories = [];


    constructor(private fb: FormBuilder,
                private notification: NzNotificationService,
                private router: Router,
                private adminService: AdminService,
                private categoryService: CategoryService
            ) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            categoryId: [null, [Validators.required]],
            subCategoryId: [null, [Validators.required]],
            serviceName: [null, [Validators.required]],
            description: [null, [Validators.required]],
            price: [null, [Validators.required]],
        })
        this.getAllCategories();
    }

    getAllCategories() {
        this.categoryService.categories().subscribe(res=> {
            console.log("The result is:", res)
            this.listofCategories = res;
        })
    }

    onCategoryChange(categoryId: any): void {
        const selectedCategory = this.listofCategories.find(category => category.id === categoryId);
        this.listOfSubCategories = selectedCategory ? selectedCategory.subCategories : [];
        this.validateForm.get('subCategoryId')?.reset();  // Reset subcategory selection
    }    

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        this.previewImage();
    }

    previewImage() {
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        }
        reader.readAsDataURL(this.selectedFile);
    }

    postService() {
        const formData: FormData = new FormData();

        // Include the categoryId in the FormData
        formData.append('categoryId', this.validateForm.get('categoryId').value);
        formData.append('subCategoryId', this.validateForm.get('subCategoryId')?.value);
        formData.append('img', this.selectedFile);
        formData.append('serviceName', this.validateForm.get('serviceName').value);
        formData.append('description', this.validateForm.get('description').value);
        formData.append('price', this.validateForm.get('price').value);

        this.adminService.postService(formData).subscribe(res => {
            this.notification
                .success(
                    'SUCCESS',  
                    `Service Posted Successfully!`,
                    {nzDuration: 5000}
                );
            this.router.navigateByUrl('/admin/ads');
        }, error => {
            this.notification
                .error(
                    'ERROR',
                    `${error.error}`,
                    {nzDuration: 5000}
                )
        })

    }

}
