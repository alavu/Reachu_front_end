import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/client/services/client.service';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss']
})
export class ServiceCategoriesComponent {

  isSmallScreen!: boolean;
  
  validateForm!: FormGroup;
  ads: any[] = [];
  filteredAds: any[] = [];
  
  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
    private breakpointObserver: BreakpointObserver) {
      this.breakpointObserver.observe([
        Breakpoints.Handset
      ]).subscribe(result => {this.isSmallScreen = result.matches;});
}

getAllAds(){
  this.clientService.getAllAds().subscribe(res=>{
    this.ads = res;
  })
}

ngOnInit(){
  this.validateForm = this.fb.group({
    service: [null, [Validators.required]]
  })
  this.getAllAds();
}

// searchAdByName(){
//   this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe(res =>{
//     console.log('Search Result:', res);
//     this.ads = res;
//   }, error => {
//     console.error('Search API Error:', error); // any error that occurs during the API call
//   });
// }

searchAdByName(): void {
  const serviceName = this.validateForm.get('service')?.value;
  this.clientService.searchAdByName(serviceName).subscribe(res => {
    console.log('Search Result:', res);
    this.ads = res;
    this.filteredAds = res; // Initial filtering
  }, error => {
    console.error('Search API Error:', error);
  });
}

onInputChange(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  if (value) {
    this.filteredAds = this.ads.filter(ad => ad.serviceName.toLowerCase().includes(value.toLowerCase()));
  } else {
    this.filteredAds = [];
  }
}

onAdSelected(ad: any): void {
  this.router.navigate(['/client/ad', ad.id]);
}

updateImg(img){
  return 'data:image/jpeg;base64,' + img;
}

}
