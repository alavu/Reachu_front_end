import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {

  validateForm!: FormGroup;
  ads: any[] = [];

  constructor(private clientService: ClientService, private fb: FormBuilder){}

  
ngOnInit(){
  this.validateForm = this.fb.group({
    service: [null, [Validators.required]]
  })
  this.getAllAds();
}

  package1Quantity: number = 0;
  package2Quantity: number = 0;

  addPackage(packageId: number) {
    if (packageId === 1) {
      this.package1Quantity = 1;
    } else if (packageId === 2) {
      this.package2Quantity = 1;
    }
  }

  incrementPackage(packageId: number) {
    if (packageId === 1) {
      this.package1Quantity++;
    } else if (packageId === 2) {
      this.package2Quantity++;
    }
  }

  decrementPackage(packageId: number) {
    if (packageId === 1 && this.package1Quantity > 0) {
      this.package1Quantity--;
    } else if (packageId === 2 && this.package2Quantity > 0) {
      this.package2Quantity--;
    }
  }

  getAllAds(){
    this.clientService.getAllAds().subscribe(res=>{
      this.ads = res;
    })
  }
}
