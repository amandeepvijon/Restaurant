import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MediaService } from '../media.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TemplateRef, ViewChild } from '@angular/core';
import { Dialog2Component } from 'app/dialog2/dialog2.component';
import { AdminService } from 'app/services/admin.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
 
  uploadedMedia: Array<any> = [];
  format:any;
  url:any;
  openform=false;
  ReadMore:boolean = true
  visible:boolean = false
  image:any;
  env = environment;
  showspinner:boolean;

 aboutsectionForm=new FormGroup({
    aboutTitle : new FormControl(null, [Validators.required]),
    aboutSummary : new FormControl(null, [Validators.required]),
    aboutPhone: new FormControl('',  [Validators.required]),
    image : new FormControl(null, [Validators.required]),
  })
   
  editaboutSectionForm=new FormGroup({
    aboutTitle : new FormControl(null, [Validators.required]),
    aboutSummary : new FormControl(null, [Validators.required]),
    aboutPhone: new FormControl('',  [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    image : new FormControl(null),
  })

  constructor(private mediaService: MediaService,private dialog: MatDialog,private adminService: AdminService,
    private toastr:ToastrService) {}

  ngOnInit() {
    this.getaboutsection();
    
  }
  get f(){return this.aboutsectionForm.controls}


  getaboutsection(){
      this.adminService.aboutSection().subscribe(resp => {
       console.log(resp);
        this.url=resp;
        this.aboutsectionForm.patchValue({    
        aboutTitle : this.url.title,
        aboutSummary : this.url.summary,
        aboutPhone : this.url.phone,
        image:this.url.link
        });
        this.image=environment.apiBaseUrl;    
    },
    (err) => {
      console.error(err);
    })
  }

  addaboutsection(){
    this.showspinner=true;
    console.log(this.aboutsectionForm.value);
      const formData = new FormData();
      if(this.image!=null){
        formData.append('aboutTitle',this.aboutsectionForm.value.aboutTitle);
        formData.append('aboutSummary',this.aboutsectionForm.value.aboutSummary);
        formData.append('aboutPhone',this.aboutsectionForm.value.aboutPhone);
        formData.append('file',this.image);
       console.log(formData);             
       this.adminService.updateaboutSection(formData).subscribe(resp => {
       console.log(resp);
       this.showspinner=false;
       this.toastr.success("Success");
       window.location.reload();
      },
      (err) => {
        console.error(err);
        this.toastr.error(err);
      })
    }
  }
  
  updatebanner()
  {
   const formData = new FormData();
    formData.append('aboutTitle', this.aboutsectionForm.value.aboutTitle);
    formData.append('aboutSummary',this.aboutsectionForm.value.aboutSummary);
    formData.append('aboutPhone',this.aboutsectionForm.value.aboutPhone);
    formData.append('file', this.image);
    console.log(formData);
  }


  editbannner(){
    this.dialog.open(Dialog2Component, {
      data: {name: "editaboutsection"}
    });
  }
  callAPI() {
      this.editaboutSectionForm.patchValue({    
      aboutTitle :  this.aboutsectionForm.value.aboutTitle,    
      aboutSummary :  this.aboutsectionForm.value.aboutSummary,
      aboutPhone :  this.aboutsectionForm.value.aboutPhone
      });
      
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result === 'yes') {
                console.log('User clicked yes.');
            } else if (result === 'no') {
                console.log('User clicked no.');
            }
        }
    })
  }
  saveImage(event:any){

    var file:File=event.target.files.item(0);
    this.image=file;

    var myReader: FileReader=new FileReader();

    //base 64
    // console.log('before');
    myReader.readAsDataURL(file);

    //Event after
    myReader.onload=(e)=>{
    }
  }


  
  updateaboutsection()
  {
   const formData = new FormData();
    formData.append('aboutTitle', this.editaboutSectionForm.value.aboutTitle);
    formData.append('aboutSummary',this.editaboutSectionForm.value.aboutSummary);
    formData.append('aboutPhone',this.editaboutSectionForm.value.aboutPhone);
    formData.append('file', this.image);
    this.adminService.updateaboutSection(formData).subscribe(resp => {
      console.log(resp);
    window.location.reload();
    },
    (err) => {
      console.error(err);
      window.location.reload();
    })
  }

}