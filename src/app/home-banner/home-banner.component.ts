import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MediaService } from '../media.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TemplateRef, ViewChild } from '@angular/core';
import { Dialog2Component } from 'app/dialog2/dialog2.component';
import { AdminService } from 'app/services/admin.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {


  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
 
  uploadedMedia: Array<any> = [];
  format:any;
  url:any;
  openform=false;
  myFiles:any[] =[];
  ReadMore:boolean = true
  visible:boolean = false
  image:any;
  imageurl:any;
  env = environment;
  showspinner:boolean;
    
  bannerForm=new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    file: new FormControl(null, [Validators.required]),
  })
  editbannerForm=new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    file: new FormControl(null),
    fileid:new FormControl(null, [Validators.required]),
  })
  constructor(private mediaService: MediaService,private dialog: MatDialog,private adminService:AdminService,private http :HttpClient,
    private toastr:ToastrService) {}

  ngOnInit() { 
     this.getbanner();
  }

  getbanner(){
    this.adminService.getbanner().subscribe(resp => {
      console.log(resp);
      this.url=resp.banners;
      this.image=environment.apiBaseUrl; 
    },
    (err) => {
      console.error(err.message);
    })
  }
 
  get f() {
    return this.bannerForm.controls;
  }

  addBanner(){
    this.showspinner=true;
    console.log(this.bannerForm.value);
      const formData = new FormData();
      if(this.image!=null){
        formData.append('file',this.image);
        formData.append('bannerTitle',this.bannerForm.value.title);
        formData.append('bannerDesc',this.bannerForm.value.description);
      console.log(formData);              
      this.adminService.addBanner(formData).subscribe(resp => {
      console.log(resp);
      this.showspinner=false;
      this.dialog.open(Dialog2Component, {
        data: { name: "success"}
        });
      window.location.reload();
      },
      (err) => {
        console.error("Not added banner");
      })
    }
  }
  
  saveImage(event:any){
    var file:File=event.target.files.item(0);
    this.image=file;
    var myReader: FileReader=new FileReader();
    myReader.readAsDataURL(file);
    myReader.onload=(e)=>{
    }
  }

   onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }
    
onClickOpenForm(){
   this.openform=true;
   return this.openform;
 }
        
 onclick(){
  this.ReadMore = !this.ReadMore; 
  this.visible = !this.visible
  }


  callAPI(event: any) {
    this.editbannerForm.patchValue({   
      fileid : event.link, 
      title : event.title,    
      description : event.description,
      });
       let dialogRef = this.dialog.open(this.callAPIDialog);
       dialogRef.afterClosed().subscribe(result => {
    
    })
}


updatebanner(){
    const formData = new FormData();
    formData.append('bannerLink', this.editbannerForm.value.fileid);
    formData.append('bannerTitle',this.editbannerForm.value.title);
    formData.append('bannerDesc',this.editbannerForm.value.description);
    formData.append('file', this.image);
    console.log(FormData);
    this.adminService.updateBanner(formData).subscribe(resp => {
      console.log(resp);
     window.location.reload();
    },
    (err) => {
      console.error("Not updated");
    })
  }

   deleteBanner(data :number){
    this.dialog.open(Dialog2Component, {
      data: {id: data, name: "deletHomeBanner"}
      });
  }
}