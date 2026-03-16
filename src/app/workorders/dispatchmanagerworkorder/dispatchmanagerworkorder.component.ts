import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-dispatchmanagerworkorder',
  templateUrl: './dispatchmanagerworkorder.component.html',
  styleUrls: ['./dispatchmanagerworkorder.component.css']
})
export class DispatchmanagerworkorderComponent {
  AllDispatchWorkorders: any[] = [];
  pro: any;

  AllWorkOrderData: any[] = [];
  AllPurchaseOrderData: any[] = [];
  AllRequirementData: any[] = [];

  AllManagerdata: any[] = [];
  AllEngineerdata: any[] = [];
  AllQCdata: any[] = [];

  AddWorkorderForm: FormGroup;
  EditWorkorderForm: FormGroup;

  SelectedWorkOrderData: any;

  constructor(private _rest: RestService, private _state: StateService, private sanitizer: DomSanitizer) {
    this.AddWorkorderForm = new FormGroup({
      Dispatch_Status: new FormControl('')
    });

    this.EditWorkorderForm = new FormGroup({
      Workorder_Id: new FormControl(''),
      Dispatch_Status: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.AllDisapatchmanagerworkorder();
  }

  AllDisapatchmanagerworkorder() {
    this._rest.Workorderfordispatchmanager().subscribe((data: any) => {
      console.log(data);
      this.AllDispatchWorkorders = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AddWorkOrderData() {
    this._rest.AddWorkOrder(this.AddWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllDisapatchmanagerworkorder();
      this.AddWorkorderForm.reset();
    }, (err: any) => {
      console.log(err);
      alert('Error while adding work Order');
    });
  }

  EditPurchaseOrder(Workorder_Id: any) {
    const selectworkorder = this.AllDispatchWorkorders.find(purchaseorder => purchaseorder.Workorder_Id === Workorder_Id)
    if (selectworkorder) {
      this.SelectedWorkOrderData = 1;
      this.EditWorkorderForm.patchValue(selectworkorder);
    } else {
      console.log(`Workorder Order with ID ${Workorder_Id} not found.`);
    }
  }

  UpdatePurchaseOrder() {
    this._rest.UpdateDispatchManagerStatus(this.EditWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllDisapatchmanagerworkorder();
      this.EditWorkorderForm.reset();
      this.ngOnInit();
    }, (err: any) => {
      console.log(err);
      alert('Error while Updating Dispatch Manager Status');
    });
  }

  getsafeurl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  downloadFromUrl(fileUrl: string) {
    const fileName = fileUrl.split('/').pop();   // extract file name

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName ?? 'file';   // force download
    a.target = "_blank";
    a.click();
  }

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
