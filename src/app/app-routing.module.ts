import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupClientComponent} from './auth/signup-client/signup-client.component';
import {LoginComponent} from './auth/login/login.component';
import {ActivateAccountComponent} from "./client/pages/activate-account/activate-account.component";
import {AdminLoginComponent} from "./auth/admin-login/admin-login.component";
import {HomeComponent} from "./home/home/home.component";
import {PartnerLoginComponent} from "./auth/partner-login/partner-login.component";
import {SignupPartnerComponent} from "./auth/signup-partner/signup-partner.component";
import { CancelComponent } from './stripe/cancel/cancel.component';
import { SucessComponent } from './stripe/sucess/sucess.component';
import { MyBookingsComponent } from './client/pages/my-bookings/my-bookings.component';
import { ChatComponent } from './client/pages/chat/chat.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent },
    {path: 'booking', component: MyBookingsComponent },
    {path: 'chat', component: ChatComponent },
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminLoginComponent},
    {path: 'register_client', component: SignupClientComponent},
    {path: 'register_partner', component: SignupPartnerComponent},
    {path: 'register', component: SignupClientComponent},
    {path: 'activate-account', component: ActivateAccountComponent},
    {path: 'partner-login', component: PartnerLoginComponent},
    { path: 'cancel', component: CancelComponent },
    { path: 'success', component: SucessComponent },
    {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
    {path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule)},
    {path: 'partner', loadChildren: () => import('./partners/partners.module').then(m => m.PartnersModule)}];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
