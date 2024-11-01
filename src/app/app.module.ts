import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoNgZorroAntdModule} from './DemoNgZorroAntdModule';
import {SignupClientComponent} from './auth/signup-client/signup-client.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {environment} from "./environment";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {NzButtonModule} from "ng-zorro-antd/button";
import { HomeComponent } from './home/home/home.component';
import { ServiceCategoriesComponent } from './home/service-categories/service-categories.component';
import { ServiceRatingComponent } from './home/service-rating/service-rating.component';
import { PromotionalBannersComponent } from './home/promotional-banners/promotional-banners.component';
import { HeaderComponent } from './home/header/header.component';
import { PartnerLoginComponent } from './auth/partner-login/partner-login.component';
import {SignupPartnerComponent} from "./auth/signup-partner/signup-partner.component";
import { MaterialModule } from './MaterialModule';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { CategoryServiceComponent } from './home/category-service/category-service.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { ServiceItemsComponent } from './home/service-items/service-items.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { CategoryDetailComponent } from './client/pages/category-detail/category-detail.component';
import { AdminInterceptor } from './admin/services/admin-interceptor.service';
import { CancelComponent } from './stripe/cancel/cancel.component';
import { SucessComponent } from './stripe/sucess/sucess.component';
registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupClientComponent,
        SignupPartnerComponent,
        PartnerLoginComponent,
        HomeComponent,
        HeaderComponent,
        PromotionalBannersComponent,
        ServiceCategoriesComponent,
        ServiceRatingComponent,
        CategoryServiceComponent,
        CheckoutComponent,
        ServiceItemsComponent,
        CategoryDetailComponent,
        CancelComponent,
        SucessComponent,


    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserModule,
        FontAwesomeModule,
        GoogleSigninButtonModule,
        BrowserAnimationsModule,
        DemoNgZorroAntdModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        NzModalModule,
        NzButtonModule,
        HttpClientModule,
        MaterialModule,
        MatButtonToggleModule,
        NzAutocompleteModule,

    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AdminInterceptor,
            multi: true
        },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(environment.google_id)
                    },
                ]
            } as SocialAuthServiceConfig
        },
        {
            provide: NZ_I18N,
            useValue: en_US
          }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
