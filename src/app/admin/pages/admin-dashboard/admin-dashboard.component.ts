import {Component, OnInit} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{

    bookings: any;
    totalOrders: number;
    totalCustomers: number;
    totalRevenue: number;
    totalBookings: number;

  constructor(private http: HttpClient,
              private adminService: AdminService,
              private notification: NzNotificationService){}

  ngOnInit(){
    this.getAllAdBookings();
    this.getTotalOrders();
    this.getTotalCustomers();
    this.getTotalRevenue();
    this.getTotalBookings();
  }

  getAllAdBookings(){
    this.adminService.getAllAdBookings().subscribe(res =>{
      console.log(res);
      this.bookings = res;
    })
  }

    getTotalOrders() {
      this.adminService.getTotalOrders().subscribe(res =>{
          console.log("Total order:", res)
          this.totalOrders = res.totalOrders;
      })
    }

    getTotalCustomers() {
        this.adminService.getTotalCustomers().subscribe(res =>{
            this.totalCustomers = res.totalCustomers;
        })
    }

    getTotalRevenue() {
        this.adminService.getTotalRevenue().subscribe(res =>{
            this.totalRevenue = res.totalRevenue;
        })
    }

    getTotalBookings() {
        this.adminService.getTotalBookings().subscribe(res =>{
            this.totalBookings = res.totalBookings;
        })
    }

  changeBookingStatus(bookingId: number, status:string){
    this.adminService.changeBookingStatus(bookingId, status).subscribe(res=>{
      this.notification
      .success(
        'SUCCESS',
        `Booking status changed successfully`,
        { nzDuration: 5000 }
      );
      this.getAllAdBookings();
    }, error =>{
      this.notification
        .error(
          'ERROR',
          `${error.message}`,
          { nzDuration: 5000 }
        )
    })
  }

}
