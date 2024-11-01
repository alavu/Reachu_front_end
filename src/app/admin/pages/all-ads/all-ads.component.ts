import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.scss']
})
export class AllAdsComponent {

  ads:any;

  constructor(private adminService: AdminService,
    private notification: NzNotificationService,){}

  ngOnInit(){
    this.getAllAdsByUserId();
  }

  getAllAdsByUserId(){
    this.adminService.getAllAdsByUserId().subscribe(res =>{
      this.ads = res;
    })
  }

  updateImg(img){
    return 'data:image/jpeg;base64,' + img;
  }

  deletedAd(adId:any){
    this.adminService.deletedAd(adId).subscribe(res=>{
      this.notification
      .success(
        'SUCCESS',
        `Ad Deleted Successfully`,
        { nzDuration: 5000 }
      );
      this.getAllAdsByUserId();
    })
  }

}
