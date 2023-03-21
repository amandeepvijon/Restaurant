import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, FormBuilder,Validators } from '@angular/forms';
import { UserserviceService } from 'app/services/userservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]),
    // Restaurants:new FormControl('',[Validators.required])
  });

  showspinner=false;
  constructor(private router:Router,private userservice:UserserviceService,private toast:ToastrService) { }

  ngOnInit(): void {
  }

  get f(){return this.loginForm.controls}

  onClickSubmit(){
    this.userservice.login(this.loginForm.value).subscribe(resp => {
      console.log(resp);
      this.toast.success("Login Successfully");
      localStorage.setItem('token',resp.token);
      this.router.navigate(['/general-setting']);
      },
      (err) => {
        console.error(err);
        this.toast.error("Incorrect Credentials");
      })
    }
  }
