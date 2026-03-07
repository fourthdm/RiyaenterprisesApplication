import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.css']
})
export class PurchaseorderComponent implements OnInit {

  AllRequirementData: any[] = [];
  AllQuotationsData: any[] = [];
  PurchaseOrder: any[] = [];

  pro: any;

  AddPurchaseorderform: FormGroup;
  // EditquotationForm: FormGroup;

  SelectedPurchaseorder: any;

  constructor(private _rest: RestService, private fb: FormBuilder, private _router: Router) {
    this.AddPurchaseorderform = this.fb.group({
      Requirement_No: [''],
      Quotation_Number: [''],
      Quotation_Id: [''],
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
      Shipping_Method: [''],
      Delivery_Date: [''],
      PurchaseOrder_Status: ['Create'],
      items: this.fb.array([])   // 🔥 REQUIRED
    });
  }

  ngOnInit(): void {
    this.AllRequirements();
    this.ALLQuotation();
    this.ALLPurchaseOrder();
  }

  autoFillByRequirement(Quotation_Id: string) {
    const req = this.AllQuotationsData.find(
      (r: any) => r.Quotation_Id === Quotation_Id
    );

    if (!req) return;

    this.AddPurchaseorderform.patchValue({
      Requirement_No: req.Requirement_No,
      Quotation_Number: req.Quotation_Number,
      Client_Name: req.Client_Name,
      Client_Address: req.Client_Address,
      GST_No: req.GST_No,
      CGST_amount: req.CGST_amount,
      SGST_amount: req.SGST_amount,
      SubTotal: req.SubTotal,
      Discount_Amount: req.Discount_Amount,
      Total_Amount: req.Total_Amount,
      Grand_Total: req.Grand_Total,
      Payment_term: req.Payment_term,
      Shipping_Method: req.Shipping_Method

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
      this.PurchaseOrder = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  get items(): FormArray {
    return this.AddPurchaseorderform.get('items') as FormArray;
  }

  createItem(product: any): FormGroup {
    return this.fb.group({
      Product_Name: [product.Product_Name],
      Material_Type: [product.Material_Type],
      HSN_Code: [product.HSN_Code],
      Product_Quantity: [product.Product_Quantity],
      Rate: [product.Rate],
      Subtotal: [product.Subtotal],
      Manufacturing_Cost: [product.Manufacturing_Cost],
      Material_Cost: [product.Material_Cost],
      Dispatch_Cost: [product.Dispatch_Cost],
    });
  }

  onRequirementSelect(quotationId: string) {
    const selectedReq = this.AllQuotationsData.find(

      (r: any) => r.Quotation_Id == quotationId
    );

    if (!selectedReq) return;

    // 🔹 Header auto-fill
    this.AddPurchaseorderform.patchValue({
      Requirement_No: selectedReq.Requirement_No,
      Quotation_Number: selectedReq.Quotation_Number,
      Client_Name: selectedReq.Client_Name,
      Client_Address: selectedReq.Client_Address,
      GST_No: selectedReq.GST_No,
      CGST_amount: selectedReq.CGST_amount,
      SGST_amount: selectedReq.SGST_amount,
      SubTotal: selectedReq.SubTotal,
      Discount_Amount: selectedReq.Discount_Amount,
      Total_Amount: selectedReq.Total_Amount,
      Grand_Total: selectedReq.Grand_Total,
      Payment_term: selectedReq.Payment_term,
      Shipping_Method: selectedReq.Shipping_Method,
    });

    // 🔹 CLEAR OLD PRODUCTS
    this.items.clear();

    // 🔹 PUSH PRODUCTS INTO FORMARRAY
    selectedReq.items.forEach((p: any) => {
      this.items.push(this.createItem(p));
    });
  }

  submitPurchaseorder() {
    const payload = this.AddPurchaseorderform.getRawValue();

    console.log(payload); // ✅ MUST SHOW items ARRAY

    this._rest.AddedPurchaseOrder(payload).subscribe(res => {
      alert('Purchase Order Added Successfully');
      this.AddPurchaseorderform.reset();
      this.ngOnInit();
    });
  }

  printPdf(Purchase_id: any) {
    this._rest.GetPurchaseOrderPDF(Purchase_id)
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
