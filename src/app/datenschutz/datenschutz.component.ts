import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Editor } from 'ngx-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { toHTML } from 'ngx-editor';
import { AdminService } from 'app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'datenschutz',
  templateUrl: './datenschutz.component.html',
  styleUrls: ['./datenschutz.component.scss']
})
export class DatenschutzComponent implements OnInit {
  dateForm=new FormGroup({
    privacy : new FormControl(null, [Validators.required]),
  })

  editor: Editor;
  html: '';
  htmlContent:any;
  data:any;
  showspinner:boolean;

  constructor(private  adminService:AdminService,private toast:ToastrService){}

  ngOnInit() {
    this.editor = new Editor();
    this.getDaten();
  }
  

  ngOnDestroy(): void {
    this.editor.destroy();
    console.log(this.editor);
    this.getDaten();
  }

  getDaten(){
    this.adminService.getDaten().subscribe(resp => {
    this.data=resp;
    this.dateForm.patchValue({    
      privacy : this.data.imprint
        });
    console.log(resp,"testingdaten");
  },
  (err) => {
    console.error(err);
  })
}

onclicksubmit(){
  var data={
    imprint:this.dateForm.controls['privacy'].value
  }
  this.showspinner=true;
  this.adminService.updateDaten(data).subscribe(resp => {
  console.log(resp);
  this.showspinner=false;
  this.toast.success("Updated succesfully");
  window.location.reload();
 },
 (err) => {
   console.error(err);
   this.toast.error(err.message);
 })
}
}

