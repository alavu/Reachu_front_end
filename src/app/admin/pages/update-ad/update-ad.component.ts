import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.scss']
})
export class UpdateAdComponent {

  adId:any = this.activatedroute.snapshot.params['id'];

  
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  validateForm!: FormGroup;
  existingImage: string | null = null;
  listofCategories: any = [];
  listOfSubCategories = [];


  imgChanged = false;


  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private adminService: AdminService,
    private activatedroute: ActivatedRoute){}

    ngOnInit(){
      this.validateForm = this.fb.group({
        serviceName: [null, [Validators.required]],
        description: [null, [Validators.required]],
        price: [null, [Validators.required]],
        categoryId: [null, [Validators.required]],
        subCategoryId: [null, [Validators.required]],
      })
      this.getAdById();
      this.getAllCategories();
    }

    getAllCategories() {
      this.adminService.getAllCategories().subscribe(res=> {
          this.listofCategories = res;
      })
    }

    onCategoryChange(categoryId: any): void {
      const selectedCategory = this.listofCategories.find(category => category.id === categoryId);
      this.listOfSubCategories = selectedCategory ? selectedCategory.subCategories : [];
      this.validateForm.get('subCategoryId')?.reset();  // Reset subcategory selection
      }    

    onFileSelected(event:any){
      this.selectedFile =  event.target.files[0];
      this.previewImage();
      this.existingImage = null;
      this.imgChanged = true;
    }

    previewImage(){
      const reader = new FileReader();
      reader.onload = () =>{
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }

    updateAd(){
      const formData: FormData = new FormData();
      if(this.imgChanged && this.selectedFile){
        formData.append('img', this.selectedFile);
      }
     
      formData.append('serviceName', this.validateForm.get('serviceName').value);
      formData.append('description', this.validateForm.get('description').value);
      formData.append('price', this.validateForm.get('price').value);
      formData.append('categoryId', this.validateForm.get('categoryId').value);
      formData.append('subCategoryId', this.validateForm.get('subCategoryId')?.value);

      this.adminService.updateAd(this.adId,formData).subscribe(res =>{
        this.notification
        .success(
          'SUCCESS',
          `Ad updated Successfully!`,
          { nzDuration: 5000 },
        );
        this.router.navigateByUrl('/admin/ads');
      }, error =>{
        this.notification
        .error(
          'ERROR',
          `${error.error}`,
          { nzDuration: 5000 }
        )
      })

    }


  getAdById(){
    this.adminService.getAdById(this.adId).subscribe(res=>{
      console.log(res);
      this.validateForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
    })
  }

}
