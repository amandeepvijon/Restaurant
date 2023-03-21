
import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Editor } from 'ngx-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { toHTML } from 'ngx-editor';
import { AdminService } from 'app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  editor: Editor;
  html: '';
  htmlContent:any;
  image:any;
  url:any;
  showspinner:boolean;
  editor1:any;
  timeData:any;

  FooterForm=new FormGroup({
    footerTitle : new FormControl(null, [Validators.required]),
    footerAddress: new FormControl(null, [Validators.required]),
    footerDesc: new FormControl(null, [Validators.required]),
    footerPhone : new FormControl(null, [Validators.required]),
  })
   
  
  timezoneForm=new FormGroup({
    title:new FormControl(null,[Validators.required]),
    timeZone : new FormControl(null, [Validators.required])
  })



  constructor(private adminService:AdminService,private toastr:ToastrService){}

  ngOnInit() {
    this.editor = new Editor();
    this.editor1 = new Editor();
    this.getFooter();
    this.gettimezone();
  }


  getFooter(){
      this.adminService.getcontact().subscribe(resp => {
      this.url=resp;
      this.FooterForm.patchValue({    
        footerTitle : this.url.Title,
        footerAddress : this.url.Address,
        footerDesc : this.url.Description,
        footerPhone : this.url.Phone,
     });
      console.log(resp,"testing");
    },
    (err) => {
      console.error(err.message);
    })
  }
  

  gettimezone(){
    // console.log(this.timezoneForm.value);
    this.adminService.gettimezone().subscribe(resp => {
    this.timeData=resp;
    this.timezoneForm.patchValue({    
      title:this.timeData.Title,
      timeZone:this.timeData.TimeZone
   });
    console.log(resp,"testing");
  },
  (err) => {
    console.error(err.message);
  })
}

  onclickSubmit(){
       this.showspinner=true;
       this.adminService.updatecontact(this.FooterForm.value).subscribe(resp => {
       console.log(resp);
       this.showspinner=false;
       this.toastr.success("Updated succesfully");
       window.location.reload();
      },
      (err) => {
        console.error(err);
        this.toastr.error("Not updated");
      })
    }

    timezone(){
       var data ={ 
        title:this.timezoneForm.controls['title'].value,
        timeZone:this.timezoneForm.controls['timeZone'].value
       }
       this.showspinner=true;
       this.adminService.updatetimezone(data).subscribe(resp => {
       console.log(resp);
       this.showspinner=false;
       this.toastr.success("Updated succesfully");
       window.location.reload();
      },
      (err) => {
        console.error(err);
        this.toastr.error(err.message);
      })
    }
  }



