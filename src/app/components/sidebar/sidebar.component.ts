import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AdminService } from 'app/services/admin.service';
import { environment } from 'environments/environment';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/user-profile', title: 'About-us',  icon:'person', class: '' },
    { path: '/table-list', title: 'Gallery',  icon:'content_paste', class: '' },

    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/notification', title: 'Notification',  icon:'unarchive', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
   menuItems: any[];
   env = environment;
   footerImg:any;
   faIcon: boolean;

  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  getFooter(){
    this.adminService.getFooter().subscribe(resp => {
      console.log(resp,"testing");
      this.footerImg=resp;
    },
    (err) => {
      console.error(err);
    })
  }

  OpenChildNav(){
    var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    this.faIcon = true;
    x.style.display = "block";
  } else {
    this.faIcon = false;
    x.style.display = "none";
  } 
  }
}
