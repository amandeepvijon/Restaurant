import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Editor } from 'ngx-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { toHTML } from 'ngx-editor';
import { AdminService } from 'app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: '';
  data:any;
  showspinner:boolean;
  
  htmlContent:any;

  impressumform=new FormGroup({
    imprint : new FormControl(null, [Validators.required])
  })
 
 constructor(private adminService:AdminService,private toast:ToastrService){
 }
  
  get f(){return this.impressumform.controls}

  ngOnInit() {
    this.editor = new Editor();
    this.getImpressum();
  }
  

  ngOnDestroy(): void {
    this.editor.destroy();
    this.getImpressum();
  }
  
  onclicksubmit(){
    console.log(this.impressumform.value);
    
  }

  getImpressum(){
    this.adminService.getImpressum().subscribe(resp => {
    this.data=resp;
    this.impressumform.patchValue({    
      imprint : this.data.privacy
        });
    console.log(resp,"testing");
  },
  (err) => {
    console.error(err);
  })
}

updateImpressum(){
  var data={
    privacy:this.impressumform.controls['imprint'].value
  }
  this.adminService.updateImpressum(data).subscribe(resp => {
  console.log(resp);
  this.toast.success("Updated succesfully");
   window.location.reload();
 },
 (err) => {
   console.error(err);
   this.toast.error(err.message);
 })
}
}

