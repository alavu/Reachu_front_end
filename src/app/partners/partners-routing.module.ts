import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PartnerDashboardComponent} from './partner-dashboard/partner-dashboard/partner-dashboard.component';
import {PartnerProfileComponent} from './partner-profile/partner-profile.component';
import {PartnerComponent} from './partner.component';
import {AuthenticationGuard} from '../auth/guard/authentication.guard';
import {ChatClientComponent} from './chat-client/chat-client.component';
import {BookedCustomerComponent} from "./booked-customer/booked-customer.component";

const routes: Routes = [
    {
        path: '',
        component: PartnerComponent,
        canActivate: [AuthenticationGuard], data: {roles: ['PARTNER']},
        children: [
            {path: 'dashboard', component: PartnerDashboardComponent},
            {path: 'profile', component: PartnerProfileComponent},
            {path: 'chat', component: ChatClientComponent},
            {path: 'order', component: BookedCustomerComponent},

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule {
}
