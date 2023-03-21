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
import { FileUploadService } from 'app/file-upload.service';

@Component({
  selector: 'menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.scss']
})
export class MenupageComponent implements OnInit {

  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;


  env = environment;
  ReadMore:boolean = true
  visible:boolean = false
  url:any;
  openform=false;
  pdfData:any;
  image:any;
  fileName: string;
  file: File;
  pdfSource: string ='';
  menuData:any;
  toggleDiv: boolean = false;
  multipleCategoryData:any;
  update_id: any;
  multipleData:any;
  MenuItemAndPrice:any;
  pdfCard:any;
  isShowing: boolean;
  setToggle:boolean = false;
  getpdfcardData:any;
  popup: any;
  item_id:any;
  toggleData:any;



  pdfForm=new FormGroup({
    file : new FormControl(null, [Validators.required]),
  })


  MenuForm=new FormGroup({
    item : new FormControl(null, [Validators.required]),
    price : new FormControl(null, [Validators.required]),
    id : new FormControl(null, [Validators.required]),
    
 })
 
 
 CategoryMenuForm=new FormGroup({
  CategoryName : new FormControl(null, [Validators.required]),
})

 
toggleForm=new FormGroup({
  toggle : new FormControl(null, [Validators.required]),
})

EditCategoryMenuForm=new FormGroup({
  CategoryName : new FormControl(null, [Validators.required]),
})

editMenuForm=new FormGroup({
  item : new FormControl(null, [Validators.required]),
  price: new FormControl(null,[Validators.required]),
})



constructor(private mediaService: MediaService,private dialog: MatDialog,private adminService:AdminService,
  private toastr:ToastrService) {}

  ngOnInit(): void {
       this.getPdf();
       this.getCategoryMenu();
       this.getmultipleCategory();
       this.getMenuItemAndPrice();
       this.getpdfcard();
  }

  get f() {
    return this.pdfForm.controls;
  }


  getPdf(){
    this.adminService.getPdf().subscribe(resp => {
      console.log(resp,"testingpdf");
      this.pdfData=resp;
      this.pdfSource = environment.pdfUrl + this.pdfData.pdf;
    },
    (err) => {
      console.error(err.message);
    })
  } 

  getCategoryMenu(){
    this.adminService.getCategoryMenu().subscribe(resp => {
      console.log(resp,"TESTgetCategoryMenu");
      this.menuData=resp;
    },
    (err) => {
      console.error(err.message);
    })
  } 

  getmultipleCategory(){
    this.adminService.getmultipleCategory().subscribe(resp => {
      console.log(resp,"TESTgetCategoryMenu");
      this.multipleCategoryData=resp.data;
    },
    (err) => {
      console.error(err.message);
    })
  } 
   

  getMenuItemAndPrice(){
    this.adminService.getMenuItemAndPrice().subscribe(resp => {
      console.log(resp,"getMenuItemAndPrice");
      this.MenuItemAndPrice=resp.data;
    },
    (err) => {
      console.error(err.message);
    })
  } 
 

  
  addpdf(){
    const formData = new FormData();
    if(this.image!=null){
    formData.append('pdfLink', this.pdfData.pdf);
    formData.append('file',this.image);
    console.log(this.pdfData);
    this.adminService.addPdf(formData).subscribe(resp => {
    console.log(resp);
    this.toastr.success("Pdf Uploaded Successfully");
    window.location.reload();
    },
    (err) => {
      console.error("Not Added PDF");
    })
  }
  }

  addcategory(){
    console.log(this.CategoryMenuForm.value);
  }

  onClickOpenForm(){
    this.openform=true;
    return this.openform;
  }
         
  onclick(){
   this.ReadMore = !this.ReadMore; 
   this.visible = !this.visible
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
 
getpdfcard(){
  this.adminService.getpdfcard().subscribe(resp => {
    console.log(resp,"getpdfcard");
    this.setToggle=resp.data.isMenuPdf;
  },
  (err) => {
    console.error(err);
  })
} 

onValChange(){
  this.setToggle = !this.setToggle;
  let data={
    onOff : this.setToggle
  }
  console.log(data);
 this.adminService.addToggle(data).subscribe(resp => {
    console.log(resp);
    this.getpdfcard();
    this.toastr.success("Success");
  },
  (err) => {
    this.toastr.error(err.message);   
  })
}



onChange(file) {
  this.file = file.files[0];
  this.fileName = file.files[0].name;
}


deletepdf(event:any){
  this.adminService.deletePdf(event).subscribe(resp => {
  console.log("success");
  this.toastr.success("Pdf Deleted Successfully");
  window.location.reload();
 },
 (err) => {
  console.error(err); 
  this.toastr.error(err,"Not deleted");
 })
}
 

addCategoryMenu(){
  var data={
    CategoryName:this.CategoryMenuForm.controls['CategoryName'].value
  }
  this.adminService.addCategoryMenu(data).subscribe(resp => {
    console.log(resp);
    this.toastr.success("Added category Successfully");
    window.location.reload();
  },
  (err) => {
    console.error(err);
    this.toastr.error("Not added");   
  })
 }
 updateCategoryMenu(){
  console.log(this.EditCategoryMenuForm.value);
  this.adminService.updateCategoryMenu(this.EditCategoryMenuForm.value,this.update_id).subscribe(resp => {
    console.log(resp);
    this.toastr.success("updated suceesfully");
    window.location.reload();
  },
  (err) => {
    console.error(err);
    this.toastr.error(err,"Not updated");   
  })
 }
 
 getcompanyid(e){
  console.log(e.target.value)
}


 addMenuItemprice(){
  var data={
    item:this.MenuForm.controls['item'].value,
    price:this.MenuForm.controls['price'].value,
    restaurantId:this.env.restaurantId,
  }
  console.log(data);
  this.adminService.addMenuItemprice(data,this.MenuForm.controls['id'].value).subscribe(resp => {
    console.log(resp);
    window.location.reload();
    this.toastr.success("success");
  },
  (err) => {

    console.error(err);
    this.toastr.error("Not Added");   
  })
 }


 callAPI1(event: any) {
  this.EditCategoryMenuForm.patchValue({   
    CategoryName : event.CategoryName,    
    });
    this.update_id=event._id;
     let dialogRef = this.dialog.open(this.callAPIDialog);
     this.popup= 1;
     dialogRef.afterClosed().subscribe(result => {
  
  })
}

callAPI2(event: any) {
  this.editMenuForm.patchValue({   
    item : event.item,
    price:event.price    
    });
    this.item_id=event._id;
     let dialogRef = this.dialog.open(this.callAPIDialog);
     this.popup= 2;
     dialogRef.afterClosed().subscribe(result => {
  
  })
}


updateMenuItemAndPrice(){
  var data={
    item:this.editMenuForm.controls['item'].value,
    price:this.editMenuForm.controls['price'].value,
  }
 
  this.adminService.updateMenuItemAndPrice(data,this.item_id).subscribe(resp => {
    console.log(resp);
    this.toastr.success("updated suceesfully");
    window.location.reload();
  },
  (err) => {
    console.error(err);
    this.toastr.error(err,"Not updated");   
  })
}


deleteCategory(id:any){
  this.adminService.deleteCategory(id).subscribe(resp => {
  console.log("success");
 window.location.reload();
  this.toastr.success("Delete Succesfully")
 },
 (err) => {
  console.error("Not deleted"); 
 })
}



deleteitemPrice(data :number){
  this.dialog.open(Dialog2Component, {
    data: {id: data, name: "deleteitemprice"}
    });
}


deletecatdialog(data :number){
  this.dialog.open(Dialog2Component, {
    data: {id: data, name: "deletecategorymenu"}
    });
}

}