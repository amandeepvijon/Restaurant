import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AdminService } from 'app/services/admin.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Dialog2Component } from 'app/dialog2/dialog2.component';

@Component({
  selector: 'testinomials',
  templateUrl: './testinomials.component.html',
  styleUrls: ['./testinomials.component.scss']
})
export class TestinomialsComponent implements OnInit {
  openform=false;
 //readmore variable, its true than read more string will print
 ReadMore:boolean = true

 //hiding info box
 visible:boolean = false
 fileToUpload: any;
 imageUrl: any;
 image:any;
 getdata:any;
 update_id: any;
 showspinner:any;


  testimonialForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    review: new FormControl('',[Validators.required])
  });

  edittestimonialForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    review: new FormControl('',[Validators.required])
  });


  
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  constructor(private dialog: MatDialog,private adminService:AdminService,
    private toastr:ToastrService) {}

  ngOnInit(): void {
    this.gettestimonial();
  }



  gettestimonial(){
    this.adminService.gettestimonial().subscribe(resp => {
     console.log(resp);
      this.getdata=resp.data;   
  },
  (err) => {
    console.error(err);
  })
}

addtestimonial(){
  this.showspinner=true;
  console.log(this.testimonialForm.value);
  this.adminService.addtestimonial(this.testimonialForm.value).subscribe(resp => {
  console.log(resp);
  this.showspinner=false;
    this.toastr.success("Add Testinomial successfully");
     window.location.reload();
  },
  (err) => {
    console.error(err);
  })
}

updatestimonial(){
  var data ={ 
    userName : this.edittestimonialForm.controls['userName'].value,    
    review :  this.edittestimonialForm.controls['review'].value,   
  }
  this.adminService.updatestimonial(data,this.update_id).subscribe(resp => {
    console.log(resp);
   window.location.reload();
   this.toastr.success("Updated Successfully");
  },
  (err) => {
    console.error(err);
    this.toastr.error("not updated");
  })
}



deletetestimonial(data :number){
  this.dialog.open(Dialog2Component, {
    data: {id: data, name: "deleteTestinomial"}
    });
}
  onclick()
  {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  
  onSelectFile(event:any) {
    var file:File=event.target.files.item(0);
    this.image=file;
    var myReader: FileReader=new FileReader();
    myReader.readAsDataURL(file);
    myReader.onload=(e)=>{
    }
  }

  callAPI(event:any) {
    this.edittestimonialForm.patchValue({    
      userName : event.userName,    
      review : event.review,   
      });
      this.update_id=event._id;
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
      
    })
}
}

