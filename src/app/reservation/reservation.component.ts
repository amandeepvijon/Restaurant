import { Component, OnInit ,OnDestroy ,TemplateRef, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Editor } from 'ngx-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { toHTML } from 'ngx-editor';
import { AdminService } from 'app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  locationData:any;


  reservationForm=new FormGroup({
    mobile: new FormControl('',  [Validators.required]),
    address : new FormControl(null, [Validators.required]),
    link : new FormControl(null, [Validators.required]),
  })

  
  reservationTimeForm=new FormGroup({
    name: new FormControl('',  [Validators.required]),
    days : new FormControl(null, [Validators.required]),
    openTime : new FormControl(null, [Validators.required]),
    closeTime : new FormControl(null, [Validators.required]),
  })

  reservationTimeFormUpdate=new FormGroup({
    name: new FormControl('',  [Validators.required]),
    days : new FormControl(null, [Validators.required]),
    openTime : new FormControl(null, [Validators.required]),
    closeTime : new FormControl(null, [Validators.required]),
  })

  mapForm=new FormGroup({
    location : new FormControl(null, [Validators.required])
  })

  editor: Editor;
  html: '';
  htmlContent:any;
  data:any;
  showspinner:boolean;
  timeData:any;
  setToggle:boolean = false;
  optionList: any[] = [];
  selectedDays: any[] = [];
  selectedDaysUpdate: any[] = [];
  activeBtn: boolean;
  updateDays: any;
  required: boolean = !1;
  dList: any[] = [];
  updateId: any;
  isUpdate: boolean;
  deleteId : any;
  @ViewChild('timepicker') timepicker: any;
  @ViewChild('timepicker1') timepicker1: any;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  constructor(private  adminService:AdminService,private toastr:ToastrService,private dialog: MatDialog){}

  ngOnInit() {
    this.optionList = [
    { day: 'S', value: 'Sunday',  class:''},
    { day: 'M', value: 'Monday',  class:''},
    { day: 'T', value: 'Tuesday',  class:''},
    { day: 'W', value: 'Wednesday',  class:''},
    { day: 'T', value: 'Thursday',  class:''},
    { day: 'F', value: 'Friday',  class:''},
    { day: 'S', value: 'Satursday',  class:''},]
    console.log(this.optionList);
    
    this.editor = new Editor();
    this.getReservation();
    this.getLocation();
    this.getTimezone();
    
  }

  selectDays(event, index){
   var selectCurruntValue = this.selectedDays.filter(s => s.includes(event));
   console.log(selectCurruntValue);
   
   if(selectCurruntValue != event){
      this.optionList[index].class = 'active';
      this.selectedDays.push(event);
      console.log(this.selectedDays);
   }
   else{
    this.optionList[index].class = '';
    const i = this.selectedDays.findIndex(day => day === event);

    console.log('Index---->'+ i);
    
    if(i !== -1) {
      this.selectedDays.splice(i, 1);
    }
    console.log(this.selectedDays);
   }
  }


    
  updateOldDays(event : any,index){
   var selectCurruntUpdateValue = this.selectedDaysUpdate.filter(s => s.includes(event));
   console.log(selectCurruntUpdateValue);

    if(selectCurruntUpdateValue != event){
    this.updateDays[index].selected = true;
    this.selectedDaysUpdate.push(event);
    console.log(this.selectedDaysUpdate);
    }

    else{
      this.updateDays[index].selected = false;
      const i = this.selectedDaysUpdate.findIndex(day => day === event);
  
      console.log('Index---->'+ i);
      
      if(i !== -1) {
        this.selectedDaysUpdate.splice(i, 1);
      }
      console.log(this.selectedDaysUpdate);
     }

  }

  get f(){return this.reservationForm.controls}

  ngOnDestroy(): void {
    this.editor.destroy();
    console.log(this.editor); 
  }

  getLocation(){
    this.adminService.getLocation().subscribe(resp => {
      console.log(resp,"testing");
      this.locationData=resp;
      this.mapForm.patchValue({    
        location : this.locationData.data
        });
    },
    (err) => {
      console.error(err.message);
    })
  }
  
  getTimezone(){
    this.adminService.getTimezone().subscribe(resp => {
      console.log(resp,"testing");
      this.timeData=resp.data;
      this.patchDays();
      // this.reservationTimeForm.patchValue({    
      //   days : this.timeData.data,
      //   openTime:this.timeData.data,
      //   closeTime:this.timeData.data,
      //   name:this.timeData.name
      //   });
    },
    (err) => {
      console.error(err.message);
    })
  }

  patchDays()
  {
    this.timeData.forEach((slot, index) => {
      let days: any[] = [{d: "Sunday", selected: false, value: "S"}, {d: "Monday", selected: false, value: "M"}, {d: "Tuesday", selected: false, value: "T"},
                        {d: "Wednesday", selected: false, value: "W"}, {d: "Thursday", selected: false, value: "T"}, {d: "Friday", selected: false , value: "F"},
                        {d: "Saturday", selected: false, value: "S"}];

      slot.days.forEach((slotDay) => {
        days.some(day => {
            if(day.d == slotDay) {
              day.selected = true;
            }
        });
      });

      this.timeData[index].days = days;
     
      
    });
    //  console.log(this.timeData,'hhhhhhhhhhhhhhhhhhh');
  }

  callAPI(event , value) {
    this.deleteId = event._id;
    if(value === 'update'){
    this.isUpdate = true;
    }
    else{
      this.isUpdate = false;
    }
    this.updateDays = event.days;
    this.updateId = event._id;
    var updatedDays = this.updateDays.filter(d => d.selected === true);
    updatedDays.forEach(element => {
         this.selectedDaysUpdate.push(element.d);  
    });

    console.log(this.selectedDaysUpdate);
    
    // this.selectedDaysUpdate.push(this.dList);
    // console.log(this.selectedDaysUpdate);
    
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedDaysUpdate =[];
      this.getTimezone();
    });
    this.reservationTimeFormUpdate.patchValue({
      name: event.name ,
      openTime : event.openTime ,
      closeTime : event.closeTime ,
      })
  }

  getReservation(){
    this.adminService.getReservation().subscribe(resp => {
    this.data=resp;
    this.reservationForm.patchValue({    
     address:this.data.Address,
     link:this.data.Link,
     mobile:this.data.Mobile,
    });
    console.log(resp,"testingreservation");
  },
  (err) => {
    console.error(err.message);
  })
}


addDays(){

}

updatReservation(){
  var data ={
    restoAddress:this.reservationForm.controls['address'].value,
    restoLink:this.reservationForm.controls['link'].value,
    restoMobile:this.reservationForm.controls['mobile'].value,  
  }
  console.log(data);
  this.adminService.updatReservation(data).subscribe(resp => {
    console.log(resp);
    window.location.reload();
    this.toastr.success("Success");
  },
  (err) => {
     console.error(err);
     this.toastr.error("Not updated");
  })
}
 
addmap(){
  this.showspinner=true;
  var data ={
    location:this.mapForm.controls['location'].value
  }
 this.adminService.updateLocation(data).subscribe(resp => {
   console.log(resp);
   this.showspinner=false;
    window.location.reload();
   },
   (err) => {
     console.error("Not updated");
   })
}

addTimeReservation(){
  var data ={
    days:this.selectedDays,
    openTime:this.reservationTimeForm.controls['openTime'].value,
    closeTime:this.reservationTimeForm.controls['closeTime'].value,
    name:this.reservationTimeForm.controls['name'].value,
  }
  console.log(data);
  this.adminService.addTimezone(data).subscribe(resp => {
    console.log(resp);
    this.showspinner=false;
       window.location.reload();  
    },
    (err) => {
      console.error("Not updated");
    })
}


onChangeEvent(event: any){
  console.log(event.target.value);
}


updatTimeReservation(){
  console.log(this.reservationTimeFormUpdate.value);
  var data ={
    days:this.selectedDaysUpdate,
    openTime:this.reservationTimeFormUpdate.controls['openTime'].value,
    closeTime:this.reservationTimeFormUpdate.controls['closeTime'].value,
    name:this.reservationTimeFormUpdate.controls['name'].value,
  }
   console.log(this.updateId,data);
   
  this.adminService.updateTimezone(this.updateId,data).subscribe(resp => {
    console.log(resp);
    this.showspinner=false;
       window.location.reload();  
    },
    (err) => {
      console.error("Not updated");
    })
  
}

  deleteTimSlot(){
    console.log(this.deleteId);
    this.adminService.deleteTimezone(this.deleteId).subscribe(resp => {
    window.location.reload();
    this.toastr.success('Deleted successfully');
   },
   (err) => {
    console.error("Not Deleted"); 
   }) 
  }
}