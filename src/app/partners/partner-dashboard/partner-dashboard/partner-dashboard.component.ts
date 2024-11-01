    import { Component, OnInit } from '@angular/core';
    import { PartnerService } from '../../services/partner.service';

    @Component({
      selector: 'app-partner-dashboard',
      templateUrl: './partner-dashboard.component.html',
      styleUrls: ['./partner-dashboard.component.scss']
    })
    export class PartnerDashboardComponent implements OnInit {

      total_revenue = 0;
      total_users = 0;
      total_bookings = 0;
      current_bookings = 0;
      // total_consultations = 0;
      total_cancellations = 0;
      non_consultations = 0;

      graph_data_based_on = 'weekly'; // Default view
      data: any; // For chart data
      options: any; // For chart options
        partnerId = 1;

        constructor(private partnerService: PartnerService) { }

      ngOnInit(): void {
        this.loadDashboardData();
        this.updateGraphDetails();
      }

      loadDashboardData() {
        this.partnerService.getDashboardStats(this.partnerId).subscribe((response: any) => {
            console.log("response", response);
          this.total_revenue = response.totalRevenue;
          this.total_users = response.totalUsers;
          this.total_bookings = response.totalBookings;
          this.current_bookings = response.currentBookings;
          // this.total_consultations = response.totalConsultations;
          this.total_cancellations = response.totalCancellations;
          this.non_consultations = response.nonConsultations;
        });
      }

      updateGraphDetails() {
        // Update chart data based on weekly or monthly report
        this.partnerService.getGraphData(this.graph_data_based_on).subscribe((graphData: any) => {
          this.data = graphData;
          this.options = {
            responsive: true,
            maintainAspectRatio: false
          };
        });
      }
    }
