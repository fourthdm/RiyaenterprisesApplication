import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkorderComponent implements OnInit {

  AllManagerdata: any[] = [];
  AllEngineerdata: any[] = [];
  AllQCdata: any[] = [];
  AllDispatchManagerdata: any[] = [];

  AllRequirementData: any[] = [];
  WorkOrder: any[] = [];

  pro: any;

  AddWorkorderform: FormGroup;
  // EditquotationForm: FormGroup;

  SelectedQuotation: any;

  constructor(private _rest: RestService, private fb: FormBuilder, private _router: Router) {

    this.AddWorkorderform = this.fb.group({
      Requirement_No: [''],
      Req_id: [''],
      Purchase_Number: [''],
      Client_Name: [''],
      Manager_Name: [''],
      Engineer_Name: [''],
      QC_Name: [''],
      DispatchManager_Name: [''],
      WorkOrder_Status: ['Create'],
      Due_Date: [''],

      items: this.fb.array([])   // 🔥 REQUIRED
    });

  }

  ngOnInit(): void {
    this.AllRequirements();
    this.ALLWorkorders();

    this.AllQC();
    this.AllEngineer();
    this.AllManager();
    this.AllDispatchManagers();
  }

  autoFillByRequirement(Req_id: string) {
    const req = this.AllRequirementData.find(
      (r: any) => r.Req_id === Req_id
    );

    if (!req) return;

    this.AddWorkorderform.patchValue({
      Requirement_No: req.Requirement_No,
      Client_Name: req.Client_Name,

    }, { emitEvent: false }); // ✅ STOP LOOP
  }

  AllRequirements() {
    this._rest.Allrequirementss().subscribe((data: any) => {
      console.log(data);
      this.AllRequirementData = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  ALLWorkorders() {
    this._rest.AllNewWorkorder().subscribe((data: any) => {
      console.log(data);
      this.WorkOrder = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }


  AllEngineer() {
    this._rest.Engineerdata().subscribe((data: any) => {

      this.AllEngineerdata = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AllManager() {
    this._rest.Managerdata().subscribe((data: any) => {

      this.AllManagerdata = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AllQC() {
    this._rest.QCData().subscribe((data: any) => {

      this.AllQCdata = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AllDispatchManagers() {
    this._rest.DispatchManagerData().subscribe((data: any) => {
      this.AllDispatchManagerdata = data.data;
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
  }

  get items(): FormArray {
    return this.AddWorkorderform.get('items') as FormArray;
  }

  createItem(product: any): FormGroup {
    return this.fb.group({
      Product_Name: [product.Product_Name],
      Product_Quantity: [product.Product_Quantity],
      Material_Type: [product.Material_Type],
      Design_File: [product.Design_File],
      PDFDesignfile: [product.PDFDesignfile]

    });
  }

  onRequirementSelect(reqId: string) {
    const selectedReq = this.AllRequirementData.find(
      (r: any) => r.Req_id == reqId
    );

    if (!selectedReq) return;

    // 🔹 Header auto-fill
    this.AddWorkorderform.patchValue({
      Requirement_No: selectedReq.Requirement_No,
      Client_Name: selectedReq.Client_Name,

    });

    // 🔹 CLEAR OLD PRODUCTS
    this.items.clear();

    // 🔹 PUSH PRODUCTS INTO FORMARRAY
    selectedReq.items.forEach((p: any) => {
      this.items.push(this.createItem(p));
    });
  }

  submitworkorder() {
    const payload = this.AddWorkorderform.getRawValue();

    console.log(payload); // ✅ MUST SHOW items ARRAY

    this._rest.Workorder(payload).subscribe(res => {
      alert('Workorder Added Successfully');
    });
  }
}
