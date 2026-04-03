import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-managerworkorder',
  templateUrl: './managerworkorder.component.html',
  styleUrls: ['./managerworkorder.component.css']
})
export class ManagerworkorderComponent {

  AllManagerorders: any[] = [];
  pro: any;

  AllWorkOrderData: any[] = [];
  AllPurchaseOrderData: any[] = [];
  AllRequirementData: any[] = [];

  AllManagerdata: any[] = [];
  AllEngineerdata: any[] = [];
  AllQCdata: any[] = [];
  AllDispatchManagerdata: any[] = [];

  AddWorkorderForm: FormGroup;
  EditWorkorderForm: FormGroup;

  SelectedWorkOrderData: any;

  constructor(private _rest: RestService, private _state: StateService) {

    this.AddWorkorderForm = new FormGroup({
      Requirement_No: new FormControl('', [Validators.required]),
      Purchase_Number: new FormControl('', [Validators.required]),
      Payment_term: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Manager_Name: new FormControl('', [Validators.required]),
      Engineer_Name: new FormControl(''),
      QC_Name: new FormControl(''),
      DispatchManager_Name: new FormControl(''),
      Client_Name: new FormControl('', [Validators.required]),
      WorkOrder_Status: new FormControl('', [Validators.required]),
      Due_Date: new FormControl('')
    });

    this.EditWorkorderForm = new FormGroup({
      Workorder_Id: new FormControl(''),
      // Requirement_No: new FormControl('', [Validators.required]),
      // Purchase_Number: new FormControl('', [Validators.required]),
      // Payment_term: new FormControl('', [Validators.required]),
      // Product_Name: new FormControl('', [Validators.required]),
      // Product_Quantity: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Manager_Name: new FormControl('', [Validators.required]),
      Manager_Status: new FormControl(''),
      Engineer_Name: new FormControl(''),
      QC_Name: new FormControl(''),
      DispatchManager_Name: new FormControl(''),
      // Client_Name: new FormControl('', [Validators.required]),
      WorkOrder_Status: new FormControl('', [Validators.required]),
      Due_Date: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.Allworkorderss();
    this.Allrequirements();
    // this.AllPurchaseOrder();
    this.AllQC();
    this.AllEngineer();
    this.AllManager();
    this.AllDispatchManagers();
    this.AllWorkOrder();

    this.AddWorkorderForm.get('Requirement_No')?.valueChanges
      .subscribe(reqNo => {
        if (reqNo) {
          this.autoFillByRequirement(reqNo);
        }
      });
  }

  Allworkorderss() {
    this._rest.WorkorderforManager().subscribe((data: any) => {
      console.log(data);
      this.AllManagerorders = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  autoFillByRequirement(reqNo: string) {
    const req = this.AllPurchaseOrderData.find(
      (r: any) => r.Requirement_No === reqNo
    );
    if (!req) return;
    this.AddWorkorderForm.patchValue({
      Material_Type: req.Material_Type,
      Client_Name: req.Client_Name,
      Purchase_Number: req.Purchase_Number,
      Product_Name: req.Product_Name,
      Product_Quantity: req.Product_Quantity,
      Client_Address: req.Client_Address,
      Rate: req.Rate,
      Subtotal: req.Subtotal,
      CGST_amount: req.CGST_amount,
      SGST_amount: req.SGST_amount,
      Total_Amount: req.Total_Amount,
      Discount_Amount: req.Discount_Amount,
      Payment_term: req.Payment_term
    });

  }

  Allrequirements() {
    this._rest.Allrequirementss().subscribe((res: any) => {
      this.AllRequirementData = res.data;
    }, (err: any) => {
      console.error('Error fetching requirements:', err);
      console.log(err);
    });
  }

  AllPurchaseOrder() {
    this._rest.AllPurchaseOrder().subscribe((data: any) => {
      this.AllPurchaseOrderData = data.data;
    }, (err: any) => {
      console.log(err);
      alert('Error while fetching Purchase Order data');
    });
  }

  AllWorkOrder() {
    this._rest.AllWorkOrder().subscribe((data: any) => {
      this.AllWorkOrderData = data.data;
    }, (err: any) => {
      console.log(err);
      alert('Error while fetching Work Order data');
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

  AllDispatchManagers() {
    this._rest.DispatchManagerData().subscribe((data: any) => {
      this.AllDispatchManagerdata = data.data;
      console.log(data);
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

  AddWorkOrderData() {
    this._rest.AddWorkOrder(this.AddWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllWorkOrder();
      this.AddWorkorderForm.reset();
    }, (err: any) => {
      console.log(err);
      alert('Error while Adding Work Order');
    });
  }

  EditPurchaseOrder(Workorder_Id: any) {
    const selectworkorder = this.AllWorkOrderData.find(purchaseorder => purchaseorder.Workorder_Id === Workorder_Id)
    if (selectworkorder) {
      this.SelectedWorkOrderData = 1;
      this.EditWorkorderForm.patchValue(selectworkorder);
    } else {
      console.log(`Work Order with ID ${Workorder_Id} not found.`);
    }
  }

  UpdatePurchaseOrder() {
    this._rest.UpdateWorkorderbymanager(this.EditWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllWorkOrder();
      this.EditWorkorderForm.reset();
      this.ngOnInit();
    }, (err: any) => {
      console.log(err);
      alert('Error while updating Work Order');
    });
  }

  DeletePurchaseOrder(Workorder_Id: number) {
    if (confirm("Are you sure to delete this Work Order?")) {
      this._rest.DeleteWorkorder(Workorder_Id).subscribe((data: any) => {
        alert(data.message);
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
        alert('Error while Deleting Work Order');
      });
    }
  }

  downloadFromUrl(fileUrl: string) {
    const fileName = fileUrl.split('/').pop();   // extract file name

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName ?? 'file';   // force download
    a.target = "_blank";
    a.click();
  }

  // loadWorkOrders() {
  //   this._rest.AllWorkOrder().subscribe((workorders: any) => {
  //     workorders.forEach((wo:any) => {
  //       this._rest
  //         .createNotification(wo.Workorder_Id)
  //         .subscribe();
  //     });
  //   });
  // }

  exportexcel(): void {

    // STEP 4.1 – Create a new array for Excel
    const excelData = this.AllWorkOrderData.map((w: any, index: number) => {
      return {
        'Sr No': index + 1,
        'WO_Number': w.WO_Number,
        'Purchase Number': w.Purchase_Number,
        'Requirement Number': w.Requirement_No,
        'Client Name': w.Client_Name,
        'Address': w.Client_Address,
        'Payment_term': w.Payment_term,
        'Product_Name': w.Product_Name,
        'Product_Quantity': w.Product_Quantity,
        'Design_File': w.Design_File,
        'Material_Type': w.Material_Type,
        'Manager_Name': w.Manager_Name,
        'Manager_Status': w.Manager_Status,
        'Engineer_Name': w.Engineer_Name,
        'QC_Name': w.QC_Name,
        'QC_Status': w.QC_Status,
        'Engineer_Status': w.Engineer_Status,
        'DispatchManager_Name': w.DispatchManager_Name,
        'Dispatch_Status': w.Dispatch_Status,
        'Added_Date': w.Added_Date,
        'Due Date': w.Due_Date,
        'WorkOrder Status': w.WorkOrder_Status
      };
    });

    // STEP 4.2 – Convert JSON data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);

    // STEP 4.3 – Create workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // STEP 4.4 – Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AllWorkOrderData');

    // STEP 4.5 – Download Excel file
    XLSX.writeFile(workbook, 'Workorder.xlsx');

  }
}
