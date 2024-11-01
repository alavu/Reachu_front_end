import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { AllAdsComponent } from './pages/all-ads/all-ads.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {PostCategoryComponent} from "./pages/category/post-category/post-category.component";

@NgModule({
  declarations: [
    CompanyDashboardComponent,
    CreateAdComponent,
    AllAdsComponent,
    UpdateAdComponent,
    PostCategoryComponent,
  ],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        DemoNgZorroAntdModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatFormFieldModule
    ]
})
export class CompanyModule { }
