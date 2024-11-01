import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CompanyDashboardComponent} from "../company/pages/company-dashboard/company-dashboard.component";
import {DemoNgZorroAntdModule} from "../DemoNgZorroAntdModule";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLoginComponent} from "../auth/admin-login/admin-login.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import {MaterialModule} from "../MaterialModule";
import { NzTableModule } from 'ng-zorro-antd/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './pages/admin-navbar/admin-navbar.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ViewCategoriesComponent } from './pages/category/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/category/add-category/add-category.component';
import { SubcategoryComponent } from './pages/category/subcategory-component/subcategory-component.component';
import { EditCategoryDialogComponent } from './pages/category/edit-category-dialog/edit-category-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CreateServiceComponent } from './pages/create-service/create-service.component';
import { RouterModule } from '@angular/router';
import { AllAdsComponent } from './pages/all-ads/all-ads.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminInterceptor } from './services/admin-interceptor.service';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import { PartnerManagementComponent } from './pages/partner-management/partner-management.component';
import {NgChartsModule} from "ng2-charts";
import {SalesRevenueChartComponent} from "./pages/chart/sales-revenue-chart/sales-revenue-chart.component";

@NgModule({
    declarations: [
        AdminComponent,
        AdminLoginComponent,
        CompanyDashboardComponent,
        AdminNavbarComponent,
        SubcategoryComponent  ,
        UserManagementComponent,
        AddCategoryComponent,
        AdminDashboardComponent,
        ViewCategoriesComponent,
        CreateServiceComponent,
        EditCategoryDialogComponent,
        AllAdsComponent,
        UpdateAdComponent,
        PartnerManagementComponent,
        SalesRevenueChartComponent

    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        AdminRoutingModule,
        DemoNgZorroAntdModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        NzTableModule,
        FontAwesomeModule,
        MatFormFieldModule,
        MaterialModule,
        HammerModule,
        NgChartsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AdminInterceptor,
            multi: true
        },
        {provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig}

    ]
})
export class AdminModule {
}
