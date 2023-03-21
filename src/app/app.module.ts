import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GenralSettingComponent } from './genral-setting/genral-setting.component';
import { TestinomialsComponent } from './testinomials/testinomials.component';
import { ContactComponent } from './contact/contact.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MenuComponent } from './menu/menu.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MediaService } from './media.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { Dialog2Component } from './dialog2/dialog2.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswardComponent } from './forgot-passward/forgot-passward.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgxEditorModule } from 'ngx-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ResetComponent } from './reset/reset.component';
import { AuthInterceptor } from './services/http-interceptor/auth.interceptor';
import { NetworkInterceptor } from './services/http-interceptor/network.interceptor';
import { ReservationComponent } from './reservation/reservation.component';
import { MenupageComponent } from './menupage/menupage.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatChipsModule} from '@angular/material/chips';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AdminLayout2Component } from './layouts2/admin-layout2/admin-layout2.component';
import { Components2Module } from "./components2/components2.module";

@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        GenralSettingComponent,
        TestinomialsComponent,
        ContactComponent,
        ImpressumComponent,
        DatenschutzComponent,
        HomeBannerComponent,
        AboutUsComponent,
        MenuComponent,
        GalleryComponent,
        Dialog2Component,
        LoginComponent,
        ForgotPasswardComponent,
        DashboardComponent,
        NavbarComponent,
        ResetComponent,
        ReservationComponent,
        MenupageComponent,
        AdminLayout2Component,
    ],
    providers: [MediaService,
        { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        NgxEditorModule,
        AngularEditorModule,
        ToastrModule.forRoot(),
        MatProgressSpinnerModule,
        PdfViewerModule,
        MatChipsModule,
        NgxMaterialTimepickerModule,
        Components2Module
    ]
})
export class AppModule { }
