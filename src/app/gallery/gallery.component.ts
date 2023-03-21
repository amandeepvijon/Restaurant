import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'app/file-upload.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AdminService } from 'app/services/admin.service';
import { environment } from 'environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TemplateRef, ViewChild } from '@angular/core';
import { Dialog2Component } from 'app/dialog2/dialog2.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

@ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
 
 urls:any;
 url:any;
 myFiles:string [] = [];
 galleryData:any;
 imgdata:any;
 env = environment;
  
 galleryForm=new FormGroup({
     file : new FormControl(null, [Validators.required])   
  })
  
  editgalleryForm=new FormGroup({
    file : new FormControl(null, [Validators.required]),
    id:new FormControl(null, [Validators.required]), 
 })
  
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });

  uploadedMedia: Array<any> = [];
  image:any;
  image2:any;
  showspinner1:boolean;
  showspinner2:boolean;
  img:any;
  data:any;
  aboutSection1:any;
  imageUrl: any;
  loader:boolean;
  editImageId;
  showspinner:boolean;
  dataUrls: any[] = [];


  constructor(private uploadService: FileUploadService,private http: HttpClient,private adminService:AdminService,private dialog: MatDialog,private toastr:ToastrService) {}

  ngOnInit(): void { 
    this.getgallery();  
  }

  get f() {
    return this.galleryForm.controls;
  }
 
  getgallery(){
    this.adminService.getgallery().subscribe(resp => {
      console.log(resp,"testing");
       this.galleryData=resp.data.gallery;
    },
    (err) => {
      console.error(err.message);
    })
  }

  updateGallerySection(){
    this.showspinner=true;
    const formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("file[]", this.myFiles[i]);
    }
    console.log(formData);
    this.adminService.addgallery(formData).subscribe(resp => {
      console.log(resp);
      this.showspinner=false;
      this.toastr.success("Gallery Added Successfully")
       window.location.reload(); 
    },
    (err) => {
      console.error(err);
      this.toastr.error("Not  updated Gallery");
    })
   }

saveGalleryImage(event:any){
  if(event.target.files.length <= 8) {
    for(var i=0; i < event.target.files.length;i++){
      this.myFiles.push(event.target.files[i]);

      var reader = new FileReader();
              reader.onload = (event:any) => {
                console.log(event.target.result);
                 this.dataUrls.push(event.target.result); 
              }
              reader.readAsDataURL(event.target.files[i]);
    }
  }
  else {
    this.toastr.error("Select maximum 8 images only.")
  }  
}

onSelectFile(event) {
  console.log(event);
  
  if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
              reader.onload = (event:any) => {
                console.log(event.target.result);
                 this.urls.push(event.target.result); 
              }
              reader.readAsDataURL(event.target.files[i]);
      }
  }
}
onSelectFile1(event) {
  var file:File=event.target.files.item(0);
  this.image=file;
  var myReader: FileReader=new FileReader();
  myReader.readAsDataURL(file);
  myReader.onload=(e)=>{
  }
}

//  deleteGallery(id:any){
//   this.adminService.deleteGallery(id).subscribe(resp => {
//     console.log(resp);
//     window.location.reload();
//     this.toastr.success("Gallery Deleted Successfully")
//   },
//   (err) => {
//   this.toastr.error(err);
//   })
// }

deleteGallery(data :number){
  this.dialog.open(Dialog2Component, {
    data: {id: data, name: "deletGallery"}
    });
}


 editgallery(){
  const formData = new FormData();
  formData.append('id', this.editImageId);
  formData.append('file', this.image);
  console.log(FormData);
  console.log(this.editImageId);
  
  this.adminService.updateGallery(formData).subscribe(resp => {
    console.log(resp);
   window.location.reload();
   this.toastr.success("Gallery updated Successfully")
  },
  (err) => {
    console.error(err);
    this.toastr.error(err);
  })
}

callAPI(event: any) {
  this.editImageId = event;
  this.editgalleryForm.patchValue({   
    id : event.id, 
    file:event.filename
});
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
        }
    })
}
 
}
























