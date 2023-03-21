import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AdminService } from 'app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { environment } from 'environments/environment';


@Component({
  selector: 'dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.scss']
})
export class Dialog2Component implements OnInit {
  image:any;
  url:any;
  showspinner4:boolean;
  

  editbannerForm=new FormGroup({
    aboutTitle: new FormControl(null, [Validators.required]),
    aboutSummary: new FormControl(null, [Validators.required]),
    aboutPhone: new FormControl(null, [Validators.required]),
    file: new FormControl(null, [Validators.required]),
    fileid:new FormControl(null, [Validators.required]),
  })

  
  menupriceForm=new FormGroup({
    category : new FormControl(null, [Validators.required]),
    itemName : new FormControl(null, [Validators.required]),
    itemPrice : new FormControl(null, [Validators.required]),
  })

  editpricingForm=new FormGroup({
    file : new FormControl(null, [Validators.required]),
    fileid:new FormControl(null, [Validators.required]),
  })
  editMenuForm=new FormGroup({
    item : new FormControl(null, [Validators.required]),
    price: new FormControl(null,[Validators.required]),
    fileid:new FormControl(null, [Validators.required]),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private adminService:AdminService,private toast:ToastrService) { }

  ngOnInit(): void {
     this.getbanner();
  }


  getbanner(){
    this.adminService.getbanner().subscribe(resp => {
      console.log(resp);
      this.url=resp.banners;
      this.image=environment.apiBaseUrl; 
    },
    (err) => {
      console.error(err);
    })
  }
  
  deletelogo(){
    this.showspinner4=true;
    this.adminService.deletelogo().subscribe(resp => {
    console.log("success");
    this.showspinner4=false;
    window.location.reload();
    this.toast.success('delete successfully');
   },
   (err) => {
    console.error("Not Deleted"); 
   })
  }

  deletefooterlogo(){
    this.showspinner4=true;
    this.adminService.deletefooterlogo().subscribe(resp => {
    console.log("success");
    this.showspinner4=false;
    window.location.reload();
    this.toast.success('delete successfully');
   },
   (err) => {
    console.error("Not Deleted"); 
   })
  }

    updateaboutsection()
    {
      this.editbannerForm.patchValue({    
        aboutTitle :  this.editbannerForm.value.aboutTitle,    
        aboutSummary :  this.editbannerForm.value.aboutSummary,
        aboutPhone :  this.editbannerForm.value.aboutPhone
        });
     const formData = new FormData();
      formData.append('aboutTitle', this.editbannerForm.value.aboutTitle);
      formData.append('aboutSummary',this.editbannerForm.value.aboutSummary);
      formData.append('aboutPhone',this.editbannerForm.value.aboutPhone);
      formData.append('file', this.image);
      this.adminService.updateaboutSection(formData).subscribe(resp => {
        console.log(resp);
       window.location.reload();
      },
      (err) => {
        console.error("Not updated");
      })
    }
    
    updatemenuImg(){
     const formData = new FormData();
      if(this.image!=null){
        formData.append('imageLink',this.data.menuImageLink);
        formData.append('file',this.image);
       console.log(formData);
       console.log(this.image);
      this.adminService.updateMenu(formData).subscribe(resp => {
      console.log(resp);
      },
      (err) => {
        console.error("Not Updated");
      }) 
    }
    }

    onSelectFile(event:any) {

      var file:File=event.target.files.item(0);
      this.image=file;
      var myReader: FileReader=new FileReader();
      myReader.readAsDataURL(file);
      myReader.onload=(e)=>{ 
      }
  }

  updateMenuItemAndPrice(){
   alert(this.data.itemsid.item);
  
    }


    deleteCategory(id:any){
      this.adminService.deleteCategory(this.data.id._id).subscribe(resp => {
      console.log("success");
      window.location.reload();
      this.toast.success('delete successfully');
     },
     (err) => {
      console.error("Not deleted"); 
     })
    }

    deleteBanner(){
       this.adminService.deleteBanner(this.data.id.link).subscribe(resp => {
         console.log(resp);
         this.toast.success("Deleted Successfully");
         window.location.reload();
       },
       (err) => {
         this.toast.error("Not deleted");
       })
     }

     deleteMenu(){
      console.log(this.data.id);
      this.adminService.deleteMenu(this.data.id).subscribe(resp => {
      console.log(resp,"testingdeltemenu");
      window.location.reload();
     },
     (err) => {
      console.error("Not Deleted"); 
     })
    }


     deleteGallery(id:any){
      console.log(this.data.id.filename);
     this.adminService.deleteGallery(this.data.id.filename).subscribe(resp => {
    console.log(resp);
    window.location.reload();
    this.toast.success("Gallery Deleted Successfully");
  },
  (err) => {
  this.toast.error("Not deleted");
  })
}

deletetestimonial(id:any){
    this.adminService.deletetestimonial(this.data.id._id).subscribe(resp => {
      console.log(resp);
      window.location.reload();
      this.toast.success("Deleted Successfully");
    },
    (err) => {
      console.error(err);
    this.toast.error("Not Deleted Testinomial");
    })
   }

   deleteitemprice(id:any){
  this.adminService.deleteitemPrice(this.data.id._id).subscribe(resp => {
  console.log("success");
   window.location.reload();
  this.toast.success("Delete Succesfully");
 },
 (err) => {
  console.error("Not deleted"); 
 })
}

deleteItems(id:any){
  this.adminService.deleteItems(this.data.id._id).subscribe(resp => {
  console.log("success");
  window.location.reload();
 },
 (err) => {
  console.error("Not deleted"); 
 })
}

}           