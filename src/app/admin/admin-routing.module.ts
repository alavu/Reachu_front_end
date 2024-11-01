import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminLoginComponent} from "../auth/admin-login/admin-login.component";
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ViewCategoriesComponent } from './pages/category/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/category/add-category/add-category.component';
import { SubcategoryComponent } from './pages/category/subcategory-component/subcategory-component.component';import { CreateServiceComponent } from './pages/create-service/create-service.component';
import { AllAdsComponent } from './pages/all-ads/all-ads.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';
import { PartnerManagementComponent } from './pages/partner-management/partner-management.component';
const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthenticationGuard],data: { roles: ['ADMIN'] },
        children: [
          { path: '', component: AdminLoginComponent },
          { path: 'dashboard', component: AdminDashboardComponent },
          { path: 'user-management', component: UserManagementComponent },
          { path: 'partner-management', component: PartnerManagementComponent },
          { path: 'categories', component: ViewCategoriesComponent },
          { path: 'add-category', component: AddCategoryComponent },
          { path: 'add-subcategory', component: SubcategoryComponent },
          { path: 'add-services', component: CreateServiceComponent },
          { path: 'ads', component: AllAdsComponent },
          { path: 'update/:id', component: UpdateAdComponent },
          { path: 'logout', redirectTo: '/login', pathMatch: 'full' }, // added pathMatch
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
