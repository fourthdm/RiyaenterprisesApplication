import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workorderclose',
  templateUrl: './workorderclose.component.html',
  styleUrls: ['./workorderclose.component.css']
})
export class WorkordercloseComponent {

  AllorderClose: any[] = [];
  AllWorkOrderData: any[] = [];

  Addordercloseform: FormGroup;
  Editordercloseform: FormGroup;

  Selectedcloseorder: any;

  constructor(private _Rest: RestService, private _router: Router) {
    this.Addordercloseform = new FormGroup({
      WO_Number: new FormControl('', [Validators.required]),
      Payment_Status: new FormControl('', [Validators.required]),
      Delivery_Status: new FormControl('', [Validators.required]),
      Work_Close_Status: new FormControl('', [Validators.required]),
      Custom_Remark: new FormControl('', [Validators.required])
    });

    this.Editordercloseform = new FormGroup({
      WorkClose_Id: new FormControl(''),
      WO_Number: new FormControl('', [Validators.required]),
      Payment_Status: new FormControl('', [Validators.required]),
      Delivery_Status: new FormControl('', [Validators.required]),
      Work_Close_Status: new FormControl('', [Validators.required]),
      Custom_Remark: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.AllClosedWorkorder();
    this.AllWorkOrder();
  }

  AllWorkOrder() {
    this._Rest.AllWorkOrder().subscribe((data: any) => {
      this.AllWorkOrderData = data.data;
    }, (err: any) => {
      console.log(err);
      alert('Error while fetching Work Order data');
    });
  }

  AllClosedWorkorder() {
    this._Rest.Allworkorderclose().subscribe((data: any) => {
      console.log(data);
      this.AllorderClose = data.data;
      // alert(data.message);
    }, (err: any) => {
      console.log(err);
    });
  }

  AddCloseorder() {
    this._Rest.AddWorkorderclose(this.Addordercloseform.value).subscribe((data: any) => {
      console.log(data);
      this.AllorderClose = data.data;
      this.Addordercloseform.reset();
      alert(data.message);
    }, (err: any) => {
      console.log(err);
    });
  }

  editcloseorder(WorkClose_Id: any) {
    const workclosed = this.AllorderClose.find(C => C.WorkClose_Id === WorkClose_Id);
    if (workclosed) {
      this.Selectedcloseorder = 1;
      this.Editordercloseform.patchValue(workclosed);
    }
  }

  UpdateCloseorder() {
    this._Rest.Updateworkorderclose(this.Editordercloseform.value).subscribe((data: any) => {
      this.AllorderClose = data.data;
      this.Editordercloseform.reset();
      this.ngOnInit();
    }, (err: any) => {
      console.log(err);
    });
  }

  DeleteClosedorder(WorkClose_Id: any) {
    if (confirm('Are you sure to delete a closedorder')) {
      this._Rest.DeleteWorkorderClose(WorkClose_Id).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
      });
    }
  }
}
