import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {

  AllRequirementData: any[] = [];
  AllQuotationsData: any[] = [];
  AllPurchaseOrder: any[] = [];

  Bills: any[] = [];

  pro: any;

  AddBillForm: FormGroup;
  // EditquotationForm: FormGroup;

  SelectedPurchaseorder: any;

  constructor(private _rest: RestService, private fb: FormBuilder, private _router: Router) {
    this.AddBillForm = this.fb.group({
      Requirement_No: [''],
      Purchase_Number: [''],
      Client_Name: [''],
      Client_Address: [''],
      GST_No: [''],
      CGST_amount: [''],
      SGST_amount: [''],
      SubTotal: [''],
      Discount_Amount: [''],
      Total_Amount: [''],
      Grand_Total: [''],
      Purchase_Address: [''],
      Payment_term: [''],
      Payment_Method: [''],
      Shipping_Method: [''],
      Delivery_Date: [''],
      Bill_Status: ['Create'],
      items: this.fb.array([])   // 🔥 REQUIRED
    });
  }

  ngOnInit(): void {
    this.AllRequirements();
    this.ALLQuotation();
    this.ALLPurchaseOrder();
  }

  workOrderStatus: any;
  billAllowed = false;

  autoFillByRequirement(Purchase_Number: string) {
    const req = this.AllPurchaseOrder.find(
      (r: any) => r.Purchase_Number === Purchase_Number
    );

    if (!req) return;

    const deliveryDate = req.Delivery_Date ? new Date(req.Delivery_Date).toISOString().split('T')[0] : '';

    this.AddBillForm.patchValue({
      Purchase_Number: req.Purchase_Number,
      Requirement_No: req.Requirement_No,
      Client_Name: req.Client_Name,
      Client_Address: req.Client_Address,
      GST_No: req.GST_No,
      CGST_amount: req.CGST_amount,
      SGST_amount: req.SGST_amount,
      SubTotal: req.SubTotal,
      Discount_Amount: req.Discount_Amount,
      Total_Amount: req.Total_Amount,
      Grand_Total: req.Grand_Total,
      Purchase_Address: req.Purchase_Address,
      Payment_term: req.Payment_term,
      Shipping_Method: req.Shipping_Method,
      Delivery_Date: deliveryDate
    }, { emitEvent: false }); // ✅ STOP LOOP

    // FETCH WORKORDER STATUS
    this._rest.getWorkorderStatusByPO(Purchase_Number).subscribe((res: any) => {
      if (res.success) {
        this.workOrderStatus = res.data;

        this.billAllowed =
          res.data.Engineer_Status === 'Completed' &&
          res.data.QC_Status === 'Qualified' &&
          res.data.Dispatch_Status === 'Ready to Dispatch';
      } else {
        this.billAllowed = false;
      }
    });
  }

  AllRequirements() {
    this._rest.Allrequirementss().subscribe((data: any) => {
      console.log(data);
      this.AllRequirementData = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  Abill() {
    this._rest.AllBill().subscribe((data: any) => {
      console.log(data);
      this.Bills = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  ALLQuotation() {
    this._rest.AllQuotationsnew().subscribe((data: any) => {
      console.log(data);
      this.AllQuotationsData = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  ALLPurchaseOrder() {
    this._rest.AllPurchase().subscribe((data: any) => {
      console.log(data);
      this.AllPurchaseOrder = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  get items(): FormArray {
    return this.AddBillForm.get('items') as FormArray;
  }

  createItem(product: any): FormGroup {
    return this.fb.group({
      Product_Name: [product.Product_Name],
      Material_Type: [product.Material_Type],
      HSN_Code: [product.HSN_Code],
      Product_Quantity: [product.Product_Quantity],
      Rate: [product.Rate],
      Subtotal: [product.Subtotal],
    });
  }

  onRequirementSelect(Purchase_Number: string) {
    const selectedReq = this.AllPurchaseOrder.find(

      (r: any) => r.Purchase_Number == Purchase_Number
    );

    if (!selectedReq) return;
    const deliveryDate = selectedReq.Delivery_Date ? new Date(selectedReq.Delivery_Date).toISOString().split('T')[0] : '';
    // 🔹 Header auto-fill
    this.AddBillForm.patchValue({
      Requirement_No: selectedReq.Requirement_No,
      Client_Name: selectedReq.Client_Name,
      Client_Address: selectedReq.Client_Address,
      GST_No: selectedReq.GST_No,
      CGST_amount: selectedReq.CGST_amount,
      SGST_amount: selectedReq.SGST_amount,
      SubTotal: selectedReq.SubTotal,
      Discount_Amount: selectedReq.Discount_Amount,
      Total_Amount: selectedReq.Total_Amount,
      Grand_Total: selectedReq.Grand_Total,
      Purchase_Address: selectedReq.Purchase_Address,
      Payment_term: selectedReq.Payment_term,
      Shipping_Method: selectedReq.Shipping_Method,
      Delivery_Date: deliveryDate
    });

    // 🔹 CLEAR OLD PRODUCTS
    this.items.clear();

    // 🔹 PUSH PRODUCTS INTO FORMARRAY
    selectedReq.items.forEach((p: any) => {
      this.items.push(this.createItem(p));
    });
  }

  submitPurchaseorder() {
    const payload = this.AddBillForm.getRawValue();

    console.log(payload); // ✅ MUST SHOW items ARRAY

    this._rest.AddBill(payload).subscribe(res => {
      alert('Bill Added Successfully');
      this.AddBillForm.reset();
      this.ngOnInit();
    });
  }

  printPdf(Bill_Id: any) {
    this._rest.GetBillPDF(Bill_Id)
      .subscribe((file: Blob) => {
        const url = window.URL.createObjectURL(file);
        const win = window.open('', '_blank');

        if (win) {
          win.document.write(
            `<iframe src="${url}" style="width:100%;height:100%;border:none;"></iframe>`
          );

          setTimeout(() => {
            win.print();
          }, 800);

          URL.revokeObjectURL(url);
        }
      });
  }

}
