import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.css']
})
export class ChallanComponent {
  @Input() Added_Date: any;

  AllRequirementData: any[] = [];
  AllQuotationsData: any[] = [];
  AllPurchaseOrder: any[] = [];
  AllBills: any[] = [];

  Challans: any[] = [];

  pro: any;

  AddChallanform: FormGroup;
  // EditquotationForm: FormGroup;

  SelectedPurchaseorder: any;

  constructor(private _rest: RestService, private fb: FormBuilder, private _router: Router) {
    this.AddChallanform = this.fb.group({
      Requirement_No: [''],
      Purchase_Number: [''],
      Bill_Number: [''],
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
      Mode_of_Transport: [''],
      Name_of_Transport: [''],
      Vehicle_No: [''],
      Remark: [''],
      Delivery_Date: [''],
      Challan_Status: ['Create'],
      items: this.fb.array([])   // 🔥 REQUIRED
    });
  }

  ngOnInit(): void {
    this.AllRequirements();
    this.ALLQuotation();
    this.ALLPurchaseOrder();
    this.AllBill();
    this.AllChallan();
  }

  BillStatus: any;
  ChallanAllowed = false;

  autoFillByRequirement(Purchase_Number: string) {
    const req = this.AllBills.find(
      (r: any) => r.Purchase_Number === Purchase_Number
    );

    if (!req) return;

    const deliveryDate = req.Delivery_Date ? new Date(req.Delivery_Date).toISOString().split('T')[0] : '';

    this.AddChallanform.patchValue({
      Purchase_Number: req.Purchase_Number,
      Bill_Number: req.Bill_Number,
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
      Payment_Method: req.Payment_Method,
      Shipping_Method: req.Shipping_Method,
      Delivery_Date: deliveryDate
    }, { emitEvent: false }); // ✅ STOP LOOP

    // FETCH WORKORDER STATUS
    this._rest.getBillStatusByPO(Purchase_Number).subscribe((res: any) => {
      if (res.success) {
        this.BillStatus = res.data;

        this.ChallanAllowed =
          res.data.Bill_Status === 'Generate';
      } else {
        this.ChallanAllowed = false;
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

  AllChallan() {
    this._rest.AllChallans().subscribe((data: any) => {
      console.log(data);
      this.Challans = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AllBill() {
    this._rest.AllBills().subscribe((data: any) => {
      console.log(data);
      this.AllBills = data.data;
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
    return this.AddChallanform.get('items') as FormArray;
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
    const selectedReq = this.AllBills.find(
      (r: any) => r.Purchase_Number == Purchase_Number
    );

    if (!selectedReq) return;
    const deliveryDate = selectedReq.Delivery_Date ? new Date(selectedReq.Delivery_Date).toISOString().split('T')[0] : '';
    // 🔹 Header auto-fill
    this.AddChallanform.patchValue({
      Bill_Number: selectedReq.Bill_Number,
      Purchase_Number: selectedReq.Purchase_Number,
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
      Payment_Method: selectedReq.Payment_Method,
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
    const payload = this.AddChallanform.getRawValue();

    console.log(payload); // ✅ MUST SHOW items ARRAY

    this._rest.AddChallans(payload).subscribe(res => {
      alert('Challan Added Successfully');
      this.AddChallanform.reset();
      this.ngOnInit();
    });
  }

  printPdf(Challan_Id: any) {
    this._rest.GetChallanPDF(Challan_Id)
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

  exportexcel(): void {
    const excelData = this.Challans.map((a: any, index: number) => {
      return {
        'Sr No': index + 1,
        'Quotation No': a.Quotation_Number,
        'Client Name': a.Client_Name,
        'Requirement Number': a.Requirement_No,
        'Material_Type': a.Material_Type,
        'Client_Address': a.Client_Address,
        'Product_Name': a.Product_Name,
        'Product_Quantity': a.Product_Quantity,
        'Rate': a.Rate,
        'GST_No': a.GST_No,
        'Mode_of_Transport': a.Mode_of_Transport,
        'Name_of_Transport': a.Name_of_Transport,
        'CGST_amount': a.CGST_amount,
        'SGST_amount': a.SGST_amount,
        'Subtotal': a.Subtotal,
        'Total_Amount': a.Total_Amount,
        'Discount_Amount': a.Discount_Amount,
        'Payment_term': a.Payment_term,
        'Vehicle_No': a.Vehicle_No,
        'HSN_Code': a.HSN_Code,
        'Address': a.Client_Address,
        'Remark': a.Remark,
        'Added_Date': a.Added_Date,
        'Updated_Date': a.Updated_Date,
        'Challan_Status': a.Challan_Status
      };
    });

    // STEP 4.2 – Convert JSON data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);

    // STEP 4.3 – Create workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // STEP 4.4 – Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Challans');

    // STEP 4.5 – Download Excel file
    XLSX.writeFile(workbook, 'Challans.xlsx');
  }

  challanBydate() {
    this._rest.Challanbydate({ Added_Date: this.Added_Date }).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        this.Challans = data.data;
      } else {
        alert(data.message);
      }
    });
  }


}
