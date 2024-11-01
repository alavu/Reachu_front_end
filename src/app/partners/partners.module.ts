import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard/partner-dashboard.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
import { PartnerNavbarComponent } from './partner-navbar/partner-navbar/partner-navbar.component';
import { EditPartnerModalComponent } from './edit-partner-modal/edit-partner-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerComponent } from './partner.component';
import { ChatClientComponent } from './chat-client/chat-client.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {NzIconModule} from "ng-zorro-antd/icon";
import { VideoCallPartnerComponent } from './video-call-partner/video-call-partner.component';
import { PartnerBookingsComponent } from './partner-bookings/partner-bookings.component';
import {NzTableModule} from "ng-zorro-antd/table";
import { BookedCustomerComponent } from './booked-customer/booked-customer.component';
import { PartnerSalesRevenueComponent } from './chart/partner-sales-revenue/partner-sales-revenue.component';
import {NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
        PartnerComponent,
        PartnerDashboardComponent,
        PartnerProfileComponent,
        PartnerNavbarComponent,
        EditPartnerModalComponent,
        ChatClientComponent,
        VideoCallPartnerComponent,
        PartnerBookingsComponent,
        BookedCustomerComponent,
        PartnerSalesRevenueComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PartnersRoutingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        NzIconModule,
        NzTableModule,
        NgChartsModule,
    ]
})
export class PartnersModule { }
