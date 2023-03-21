import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MediaService } from '../media.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TemplateRef, ViewChild } from '@angular/core';
import { Dialog2Component } from 'app/dialog2/dialog2.component';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AdminService } from 'app/services/admin.service';
import { environment } from 'environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  uploadedMedia: Array<any> = [];
  format:any;
  url:any;
  image:any;
  imageUrl:any;
  showspinner:boolean;
  env = environment;
  ImgData:any;
  showspinner2:boolean;
  urls:any;
  myFiles:string [] = [];
  ItemsData:any;
  menu:any;
  update_id: any;
  dataUrls: any[] = [];
  categoryData:any;
  MenImgData:any;
  MenuData:any;

  menuForm=new FormGroup({
    file : new FormControl(null, [Validators.required]),
    
  })

  menupriceForm=new FormGroup({
   
    item : new FormControl(null, [Validators.required]),
    price : new FormControl(null, [Validators.required]),
    
  })

  editmenupriceForm=new FormGroup({
    item : new FormControl(null, [Validators.required]),
    price : new FormControl(null, [Validators.required]),
  })

  categoryForm=new FormGroup({
    category : new FormControl(null, [Validators.required])
  })

  pricingForm=new FormGroup({
    file : new FormControl(null, [Validators.required]),
    
  })


  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  constructor(private mediaService: MediaService,private dialog:MatDialog,private adminService:AdminService,private toastr :ToastrService) {
   
  }

  ngOnInit() {
    this.getMenuimg();
    this.getPricingImage();
    this.getItems();
    this.getCategory();
  }


  get f() {
    return this.menuForm.controls;
  }

  getMenuimg(){
    this.adminService.getMenu().subscribe(resp => {
      console.log(resp,"menuimg");
      this.MenuData=resp.data;
    },
    (err) => {
      console.error(err.message);
    })
  }

  getPricingImage(){
    this.adminService.getPricingImage().subscribe(resp => {
      console.log(resp,"testingpricingImg");
      this.ImgData=resp;
    },
    (err) => {
      console.error(err.message);
    })
  }
  

  getItems(){
    this.adminService.getItems().subscribe(resp => {
      console.log(resp,"testingmenuimages");
      this.ItemsData=resp.data;
    },
    (err) => {
      console.error(err.message);
    })
  }

  getCategory(){
    this.adminService.getCategory().subscribe(resp => {
      console.log(resp,"testingmenucategory");
      this.categoryData=resp;
      this.categoryForm.patchValue({    
        category:this.categoryData.category
        });
    },
    (err) => {
      console.error(err.message);
    })
  }
  addItems(){
   console.log(this.menupriceForm.value);
    this.adminService.postItems(this.menupriceForm.value).subscribe(resp => {
      console.log(resp);
      this.showspinner=false;
      window.location.reload();
      this.toastr.success("success");
    },
    (err) => {
      console.error(err);
      this.toastr.error("Not updated");   
    })
   }
   updateImgSection(){
    console.log(this.menuForm.value);
    
    this.showspinner=true;
    const formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("file[]", this.myFiles[i]);
    }
    console.log(formData);
    this.adminService.addMenu(formData).subscribe(resp => {
      console.log(resp);
      this.showspinner=false;
      this.toastr.success("Added Successfully")
      window.location.reload(); 
    },
    (err) => {
      console.error(err);
      this.toastr.error("Not updated");
    })
   }
   addcategory(){
    console.log(this.categoryForm.value);
    this.adminService.updateCategory(this.categoryForm.value).subscribe(resp => {
      console.log(resp);
      this.toastr.success("success");
      window.location.reload();
    },
    (err) => {
      console.error(err);
      this.toastr.error("Not Added");   
    })
   }
   updatemenu(){
    this.dialog.open(Dialog2Component, {
      data: { name: "updatemenucard"}
      });
   }   
   MenuImg(event: any){
    this.dialog.open(Dialog2Component, {
      data: { name: "MenuImg" , menuImageLink: event}
      });
   }
saveGalleryImage(event:any){
  if(event.target.files.length <= 2) {
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
    this.toastr.error("Select maximum 2 images only.")
  }  
}
  
  addMenu(){
    this.showspinner=true;
    const formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("file[]", this.myFiles[i]);
    }
    console.log(formData);
    this.adminService.addMenu(formData).subscribe(resp => {
      console.log(resp);
      this.showspinner=false;
      this.toastr.success("success")
      window.location.reload(); 
    },
    (err) => {
      console.error(err);
      this.toastr.error("Not Added Menu");
    })
   }

  addmenuImg(){
    console.log(this.pricingForm.value);
   const formData = new FormData();
    if(this.image!=null){
    formData.append('file',this.image);
    this.adminService.postPricingImage(formData).subscribe(resp => {
    console.log(resp);
    this.showspinner2=false;
    this.dialog.open(Dialog2Component, {
      data: { name: "success"}
      });
    window.location.reload();
    },
    (err) => {
      console.error("Not added menuImg");
    })
  }
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


updateitem(){
  var data={
    item:this.editmenupriceForm.controls['item'].value,
    price:this.editmenupriceForm.controls['price'].value,
  }
  
  this.adminService.updateItem(data,this.update_id).subscribe(resp => {
    console.log(resp);
    this.toastr.success("updated item");
    window.location.reload();
  },
  (err) => {
    console.error("Not Updated");
  })
}


updateCategory(){
  this.adminService.updateCategory(this.categoryForm.value).subscribe(resp => {
    console.log(resp);
    this.toastr.success("updated Category");
    window.location.reload();
  },
  (err) => {
    console.error("not updated");
  })
}


callAPI(event:any) {
  this.editmenupriceForm.patchValue({    
    item : event.item,    
    price : event.price,   
    });
    this.update_id=event._id;
  let dialogRef = this.dialog.open(this.callAPIDialog);
  dialogRef.afterClosed().subscribe(result => {
    
  })
}
 

updateMenuImg(){
  this.dialog.open(Dialog2Component, {
    data: { name: "updateMenuImg"}
    });
}
 
delete(id:any){
  this.adminService.deletePricingImage().subscribe(resp => {
    console.log(resp);
    this.toastr.success("Gallery Deleted Successfully");
    window.location.reload();
  },
  (err) => {
  this.toastr.error(err);
  })
}
deletemenuimg(data :number){
  this.dialog.open(Dialog2Component, {
    data: {id: data, name: "deletmenuSingleImg"}
    });
}

deleteItems(data :number){
  this.dialog.open(Dialog2Component, {
    data: {id: data, name: "deleteItems"}
    });
}


}


































  








 







