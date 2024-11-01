import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientDashboardComponent} from './pages/client-dashboard/client-dashboard.component';
import {AdDetailComponent} from './pages/ad-detail/ad-detail.component';
import {MyBookingsComponent} from './pages/my-bookings/my-bookings.component';
import {ReviewComponent} from './pages/review/review.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ChatComponent } from './pages/chat/chat.component';
import {ClientVideocallComponent} from "./pages/video-call/client-videocall.component";
import {AuthGuard} from "../auth/guard/auth.guard";


const routes: Routes = [
    {path: 'dashboard', component: ClientDashboardComponent},
    {path: 'bookings', component: MyBookingsComponent},
    {path: 'ad/:adId', component: AdDetailComponent},
    // {path: 'ad/:adId', component: CategoryDetailComponent}, add a cart page if needed in the future
    {path: 'checkout', component: CheckoutPageComponent},
    {path: 'review/:id', component: ReviewComponent},
    {path: 'chat', component: ChatComponent},
    // {path: 'video', component:VideoCallComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {
}
