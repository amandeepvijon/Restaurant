import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AdminService } from 'app/services/admin.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.scss']
})
export class Sidebar2Component implements OnInit {
  env = environment;
  constructor() { }

  ngOnInit(): void {
  }

}
