import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AdminService } from 'app/services/admin.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dialog2Component } from 'app/dialog2/dialog2.component';
import { environment } from 'environments/environment';
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr';  

@Component({
  selector: 'genral-setting',
  templateUrl: './genral-setting.component.html',
  styleUrls: ['./genral-setting.component.scss']
})



export class GenralSettingComponent implements OnInit {
  uploadedMedia: Array<any> = [];
  url:any;
  image:any;
  image2:any;
  showspinner1:boolean;
  showspinner2:boolean;
  showspinner:boolean;
  img:any;
  data:any;
  aboutSection1:any;
  imageUrl: any;
  loader:boolean;
  env = environment;
  footerImg:any;
  locationData:any;
  linkUrl:any;
  showspinner3:boolean;
  showspinner4:boolean;
  sociallinks:any;
  emailData:any;


  logoForm=new FormGroup({
    file : new FormControl(null, [Validators.required]),
  })

  footerlogoForm=new FormGroup({
    file : new FormControl(null, [Validators.required]),
  })
  
  mapForm=new FormGroup({
    location : new FormControl(null, [Validators.required])
  })

  linkForm=new FormGroup({
    url : new FormControl(null, [Validators.required])
  })

  socialmediaForm=new FormGroup({
    linkOne : new FormControl(null, [Validators.required]),
    linkTwo : new FormControl(null, [Validators.required]),
    
  })

  emailForm=new FormGroup({
    restEmail : new FormControl(null, [Validators.required])
  })

  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  constructor(private mediaService: MediaService, private adminService: AdminService,private dialog: MatDialog,private router:Router,
    private http:HttpClient,private toastr: ToastrService) {  
     
    }

  ngOnInit() { 
     this.getlogo();  
     this.getFooter();
     this.getLocation();
     this.getUrl();
     this.getSociallinks();
     this.getemail();
    }

  get f() {
    return this.logoForm.controls;
  }

  getlogo(){
    this.adminService.getlogo().subscribe(resp => {
      console.log(resp,"testing");
      this.url=resp;
      this.image=environment.apiBaseUrl;
    },
    (err) => {
      console.error(err.message);
    })
  }
   
  onSelectFile(event,id:number) {
    if(id===1){
    var file:File=event.target.files.item(0);
    this.image=file;
    var myReader: FileReader=new FileReader();
    myReader.readAsDataURL(file);
    myReader.onload=(e)=>{
    }
  }
  if(id===2){
  var file:File=event.target.files.item(0);
  this.image=file;
  var myReader: FileReader=new FileReader();
  myReader.readAsDataURL(file);
  myReader.onload=(e)=>{
  }
}
}

  addlogoimg(){
    this.showspinner1=true;
    const formData = new FormData();
    if(this.image!=null){
    formData.append('file',this.image);
    console.log(this.logoForm.value);
    this.adminService.addlogo(formData).subscribe(resp => {
    console.log(resp);
    this.showspinner1=false;
    this.dialog.open(Dialog2Component, {
      data: { name: "success"}
      });
    window.location.reload();
    },
    (err) => {
      console.error("Not added logo");
    })
  }
}


getFooter(){
  this.adminService.getFooter().subscribe(resp => {
    console.log(resp,"testing");
    this.footerImg=resp;
  },
  (err) => {
    console.error(err);
  })
}

addfooterlogo(){
  this.showspinner2=false;
  const formData = new FormData();
  if(this.image!=null){
  formData.append('file',this.image);
   console.log(this.footerlogoForm.value);
  this.adminService.addfooterlogo(formData).subscribe(resp => {
  console.log(resp);
  this.showspinner2=true;
  this.dialog.open(Dialog2Component, {
    data: { name: "success"}
    });
  window.location.reload();
  },
  (err) => {
    console.error("Not added logo");
  })
}
}

getLocation(){
  this.adminService.getLocation().subscribe(resp => {
    console.log(resp,"testing");
    this.locationData=resp;
    this.mapForm.patchValue({    
      location : this.locationData.data
      });
  },
  (err) => {
    console.error(err.message);
  })
}

getemail(){
  this.adminService.getpdfcard().subscribe(resp => {
    console.log(resp,"getrestEmail");
    this.emailData=resp;
    this.emailForm.patchValue({    
      restEmail : this.emailData.data.restEmail
      });
  },
  (err) => {
    console.error(err.message);
  })
} 



addmap(){
  this.showspinner=true;
  var data ={
    location:this.mapForm.controls['location'].value
  }
 this.adminService.updateLocation(data).subscribe(resp => {
   console.log(resp);
   this.showspinner=false;
   this.dialog.open(Dialog2Component, {
     data: { name: "success"}
     });
     window.location.reload();
   },
   (err) => {
    console.error("Not added map");
   })
}


deletelogo(){
  this.dialog.open(Dialog2Component, {
    data: { name: "deletelogo"}
    });
}

deletefooterlogo(){
  this.dialog.open(Dialog2Component, {
    data: { name: "deletefooterlogo"}
    });
}
  callAPI() {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
    })
   }
   
   getUrl(){
    this.adminService.getUrl().subscribe(resp => {
      console.log(resp,"test1");
      this.linkUrl=resp;
      this.linkForm.patchValue({    
        url : this.linkUrl.urlData
        });
    },
    (err) => {
      console.error(err.message);
    })
  }
  
  updateUrl(){
    this.showspinner3=true;
    var data={
      url:this.linkForm.controls['url'].value
    }
  this.adminService.updateUrl(data).subscribe(resp => {
  console.log(resp);
  this.showspinner3=false;
  this.toastr.success("Updated url successfully")
   window.location.reload();
  },
  (err) => {
    console.error(err);
    console.error("Not updated");
  })
}

getSociallinks(){
  this.adminService.getSociallinks().subscribe(resp => {
    console.log(resp,"test1");
    this.sociallinks=resp;
    this.socialmediaForm.patchValue({    
       linkOne : this.sociallinks.linkOne,
       linkTwo : this.sociallinks.linkTwo,
      });
   
  },
  (err) => {
    console.error(err.message);
  })
}

updatSociallinks(){
  var data={
    linkOne:this.socialmediaForm.controls['linkOne'].value,
    linkTwo:this.socialmediaForm.controls['linkTwo'].value
  }
this.adminService.updatSociallinks(data).subscribe(resp => {
console.log(resp);
this.toastr.success("Updated url successfully");
window.location.reload();
},
(err) => {
  console.error(err);
  this.toastr.error("Not updated");
})
}

updatemailLink(){
  var data ={
    restEmail:this.emailForm.controls['restEmail'].value
  }
  console.log(data);
  this.adminService.updateRestEmail(data).subscribe(resp => {
   console.log(resp);
   this.toastr.success('Email Link updated Successfully')
   window.location.reload();
   },
   (err) => {
    this.toastr.error("Not updated");
   })
}
}























 
    

  


  



   


  




