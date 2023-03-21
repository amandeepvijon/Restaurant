import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, FormBuilder,Validators } from '@angular/forms';
import { UserserviceService } from 'app/services/userservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

    ResetForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]),
    newPassword: new FormControl('',[Validators.required]),
    confirmpassword: new FormControl('',[Validators.required]),
    // Restaurants:new FormControl('',[Validators.required])
  });

  showspinner=false;
  
  constructor(private router:Router,private userservice:UserserviceService,private toast:ToastrService) { }

  ngOnInit(): void {
  }

  get f(){return this.ResetForm.controls}



  
  onclickSubmit(){
 let newPassword = this.ResetForm.controls['newPassword'].value;
 let confirmpassword =  this.ResetForm.controls['confirmpassword'].value;
    if(newPassword === confirmpassword){
    console.log(this.ResetForm.value,"testing");
    this.userservice.resetPassword(this.ResetForm.value).subscribe((resp)=>{
     if(resp.success){
      this.toast.success('Reset Successfully');
      // alert("reset successfully")
     }
   },
   (err) => {
     this.toast.error("not Reset");
     });
    }

   }
  }
