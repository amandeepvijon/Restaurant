import { Routes } from '@angular/router';
import { GenralSettingComponent } from 'app/genral-setting/genral-setting.component';
import { TestinomialsComponent } from 'app/testinomials/testinomials.component';
import { ContactComponent } from 'app/contact/contact.component';
import { ImpressumComponent } from 'app/impressum/impressum.component';
import { DatenschutzComponent } from 'app/datenschutz/datenschutz.component';
import { HomeBannerComponent } from 'app/home-banner/home-banner.component';
import { MenuComponent } from 'app/menu/menu.component';
import { GalleryComponent } from 'app/gallery/gallery.component';
import { AboutUsComponent } from 'app/about-us/about-us.component';
import { Dialog2Component } from 'app/dialog2/dialog2.component';
import { ReservationComponent } from 'app/reservation/reservation.component';
import { MenupageComponent } from 'app/menupage/menupage.component';


export const AdminLayoutRoutes: Routes = [
    {path: '',
    redirectTo: 'general-setting',
    pathMatch: 'full'},
    {path: 'general-setting',component:GenralSettingComponent},
    {path: 'home-banner',component:HomeBannerComponent},
    {path: 'about-us',component:AboutUsComponent},
    {path: 'menu',component:MenuComponent},
    {path: 'gallery',component:GalleryComponent},
    {path:'testimonials',component:TestinomialsComponent},
    {path:'contact',component:ContactComponent},
    {path:'impressum', component:ImpressumComponent},
    {path:'datenschutz', component:DatenschutzComponent},
    {path:'dialog2',component:Dialog2Component},
    {path:'reservation',component:ReservationComponent},
    {path:'menupage',component:MenupageComponent},
    
];
