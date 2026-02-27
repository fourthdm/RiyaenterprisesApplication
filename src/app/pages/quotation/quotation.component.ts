import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  AllRequirementData: any[] = [];
  Quotations: any[] = [];

  pro: any;

  AddQuotationform: FormGroup;
  // EditquotationForm: FormGroup;

  SelectedQuotation: any;

  constructor(private _rest: RestService, private fb: FormBuilder, private _router: Router) {
    // this.AddQuotationform = new FormGroup({
    //   Requirement_No: new FormControl('', [Validators.required]),
    //   Material_Type: new FormControl('', [Validators.required]),
    //   Client_Name: new FormControl('', [Validators.required]),
    //   Product_Name: new FormControl('', [Validators.required]),
    //   Product_Quantity: new FormControl('', [Validators.required]),
    //   Rate: new FormControl('', [Validators.required]),
    //   Manufacturing_Cost: new FormControl('', [Validators.required]),
    //   Material_Cost: new FormControl('', [Validators.required]),
    //   Dispatch_Cost: new FormControl('', [Validators.required]),
    //   Discount_Amount: new FormControl('', [Validators.required]),
    //   Payment_term: new FormControl('', [Validators.required]),
    //   Shipping_Method: new FormControl('', [Validators.required]),
    //   HSN_Code: new FormControl('', [Validators.required]),
    //   GST_No: new FormControl('', [Validators.required]),
    //   Client_Address: new FormControl('', [Validators.required]),
    //   Validity_Date: new FormControl(''),
    //   Quotation_Status: new FormControl('', [Validators.required])
    // });

    this.AddQuotationform = this.fb.group({
      Req_id: [''],
      Client_Name: [''],
      Client_Address: [''],
      GST_No: [''],

      Discount_Amount: [0],
      Payment_term: [''],
      Shipping_Method: [''],
      Validity_Date: [''],
      Quotation_Status: ['Create'],

      items: this.fb.array([])   // 🔥 REQUIRED
    });

    // this.AddQuotationform = this.fb.group({
    //   Req_id: ['', Validators.required],
    //   Client_Name: ['', Validators.required],
    //   Client_Address: ['', Validators.required],
    //   GST_No: ['', Validators.required],
    //   Payment_term: ['', Validators.required],
    //   Shipping_Method: ['', Validators.required],
    //   Quotation_Status: ['', Validators.required],
    //   Validity_Date: [''],
    //   Discount_Amount: [0],

    //   items: this.fb.array([])   // ✅ IMPORTANT
    // });

    // this.EditquotationForm = new FormGroup({
    //   Quotation_Id: new FormControl(''),
    //   Quotation_Number: new FormControl(''),
    //   Requirement_No: new FormControl('', [Validators.required]),
    //   Material_Type: new FormControl('', [Validators.required]),
    //   Client_Name: new FormControl('', [Validators.required]),
    //   Product_Name: new FormControl('', [Validators.required]),
    //   Product_Quantity: new FormControl('', [Validators.required]),
    //   Rate: new FormControl('', [Validators.required]),
    //   Manufacturing_Cost: new FormControl('', [Validators.required]),
    //   Material_Cost: new FormControl('', [Validators.required]),
    //   Dispatch_Cost: new FormControl('', [Validators.required]),
    //   Discount_Amount: new FormControl('', [Validators.required]),
    //   Payment_term: new FormControl('', [Validators.required]),
    //   Shipping_Method: new FormControl('', [Validators.required]),
    //   HSN_Code: new FormControl('', [Validators.required]),
    //   GST_No: new FormControl('', [Validators.required]),
    //   Address: new FormControl('', [Validators.required]),
    //   Validity_Date: new FormControl(''),
    //   Quotation_Status: new FormControl('', [Validators.required])
    // });
  }

  ngOnInit(): void {
    this.AllRequirements();
  }

  autoFillByRequirement(Req_id: string) {
    const req = this.AllRequirementData.find(
      (r: any) => r.Req_id === Req_id
    );

    if (!req) return;

    this.AddQuotationform.patchValue({
      Client_Address: req.Client_Address,
      Client_Email: req.Client_Email,
      Client_PhoneNo: req.Client_PhoneNo,
      GST_No: req.GST_No
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

  ALLQuotation() {
    this._rest.AllQuotation().subscribe((data: any) => {
      console.log(data);
      this.Quotations = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  get items(): FormArray {
    return this.AddQuotationform.get('items') as FormArray;
  }

  // createItem(product: any): FormGroup {
  //   return this.fb.group({
  //     Product_Name: [product.Product_Name],
  //     HSN_Code: [product.HSN_Code],
  //     Product_Quantity: [product.Product_Quantity],

  //     Manufacturing_Cost: [0],
  //     Material_Cost: [0],
  //     Dispatch_Cost: [0],

  //     Rate: [0],
  //     Subtotal: [0]
  //   });
  // }

  createItem(product: any): FormGroup {
  return this.fb.group({
    Product_Name: [product.Product_Name],
    Product_Quantity: [product.Product_Quantity],
    HSN_Code: [product.HSN_Code],

    Manufacturing_Cost: [0],
    Material_Cost: [0],
    Dispatch_Cost: [0],

    Rate: [0],
    Subtotal: [0]
  });
}

onRequirementSelect(reqId: string) {
  const selectedReq = this.AllRequirementData.find(
    (r: any) => r.Req_id == reqId
  );

  if (!selectedReq) return;

  // 🔹 Header auto-fill
  this.AddQuotationform.patchValue({
    Client_Name: selectedReq.Client_Name,
    Client_Address: selectedReq.Client_Address,
    GST_No: selectedReq.GST_No
  });

  // 🔹 CLEAR OLD PRODUCTS
  this.items.clear();

  // 🔹 PUSH PRODUCTS INTO FORMARRAY
  selectedReq.items.forEach((p: any) => {
    this.items.push(this.createItem(p));
  });
}
  // onRequirementSelect(reqId: string) {

  //   const selectedReq = this.AllRequirementData.find(
  //     (r: any) => r.Req_id == reqId
  //   );

  //   if (!selectedReq) return;

  //   // ✅ Patch header fields
  //   this.AddQuotationform.patchValue({
  //     Client_Name: selectedReq.Client_Name,
  //     Client_Address: selectedReq.Client_Address,
  //     GST_No: selectedReq.GST_No
  //   });

  //   // ✅ CLEAR OLD PRODUCTS
  //   this.items.clear();

  //   // ✅ ADD PRODUCTS AS FORM ARRAY
  //   selectedReq.items.forEach((p: any) => {
  //     this.items.push(this.fb.group({
  //       Product_Name: [p.Product_Name],
  //       Product_Quantity: [p.Product_Quantity],
  //       HSN_Code: [p.HSN_Code],

  //       Manufacturing_Cost: [0],
  //       Material_Cost: [0],
  //       Dispatch_Cost: [0],

  //       Rate: [0],
  //       Subtotal: [0]
  //     }));
  //   });
  // }

  // onRequirementSelect(Req_id: string) {
  //   const req = this.AllRequirementData.find(r => r.Req_id == Req_id);
  //   if (!req) return;

  //   // fill client details
  //   this.AddQuotationform.patchValue({
  //     Client_Name: req.Client_Name,
  //     Client_Address: req.Client_Address,
  //     GST_No: req.GST_No
  //   });

  //   // clear old products
  //   this.items.clear();

  //   // add ALL products of requirement
  //   req.items.forEach((product: any) => {
  //     this.items.push(this.createItem(product));
  //   });
  // }

calculateItem(index: number) {
  const item = this.items.at(index);

  const manu = +item.get('Manufacturing_Cost')!.value || 0;
  const material = +item.get('Material_Cost')!.value || 0;
  const dispatch = +item.get('Dispatch_Cost')!.value || 0;
  const qty = +item.get('Product_Quantity')!.value || 0;

  const rate = manu + material + dispatch;
  const subtotal = rate * qty;

  item.patchValue({
    Rate: rate,
    Subtotal: subtotal
  }, { emitEvent: false });
}

  getGrandTotal() {
    return this.items.controls.reduce((sum, item) => {
      return sum + (item.get('Subtotal')?.value || 0);
    }, 0);
  }

  submitQuotation() {
    const payload = this.AddQuotationform.getRawValue();

    console.log(payload); // ✅ MUST SHOW items ARRAY

    this._rest.AddedQuotation(payload).subscribe(res => {
      alert('Quotation Added Successfully');
    });
  }

  // submitQuotation() {
  //   const payload = this.AddQuotationform.getRawValue();
  //   this._rest.AddedQuotation(payload).subscribe((res: any) => {
  //     console.log(res);
  //     this.Quotations = res.data;
  //   }, (err: any) => {
  //     console.log(err);
  //   });

  //   // this._rest.post('/AddQuotation', payload).subscribe(res => {
  //   //   alert('Quotation Created Successfully');
  //   // });
  // }

}
// submitQuotation() {
//   const payload = {
//     Req_id: this.AllRequirementData.Req_id,
//     Client_Name: this.requirement.Client_Name,
//     Client_Address: this.requirement.Client_Address,
//     GST_No: this.requirement.GST_No,
//     Payment_term: this.form.value.Payment_term,
//     Shipping_Method: this.form.value.Shipping_Method,
//     Validity_Date: this.form.value.Validity_Date,
//     Discount_Amount: this.form.value.Discount_Amount || 0,

//     items: this.requirement.items.map((p: any) => ({
//       Product_Name: p.Product_Name,
//       HSN_Code: p.HSN_Code,
//       Product_Quantity: p.Product_Quantity,
//       Rate: p.Rate,
//       Manufacturing_Cost: p.Manufacturing_Cost,
//       Material_Cost: p.Material_Cost,
//       Dispatch_Cost: p.Dispatch_Cost
//     }))
//   };

//   this._rest.AddedQuotation(payload).subscribe(res => {
//     alert("Quotation created successfully");
//   });
// }

