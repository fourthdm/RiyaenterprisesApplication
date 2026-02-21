import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  AllData: any[] = [];
  AddClientDataForm: FormGroup;
  EditClientDataForm: FormGroup;

  SelectedClient: any = null;

  constructor(private _rest: RestService, private _State: StateService, private _router: Router) {

    this.AddClientDataForm = new FormGroup({
      Client_Name: new FormControl('', [Validators.required]),
      Client_Address: new FormControl('', [Validators.required]),
      Client_Email: new FormControl('', [Validators.required]),
      Client_PhoneNo: new FormControl('', [Validators.required]),
      GST_No: new FormControl('', [Validators.required]),
      Client_Status: new FormControl('', [Validators.required]),
    });

    this.EditClientDataForm = new FormGroup({
      Client_id: new FormControl(''),
      Client_Name: new FormControl('', [Validators.required]),
      Client_Address: new FormControl('', [Validators.required]),
      Client_Email: new FormControl('', [Validators.required]),
      Client_PhoneNo: new FormControl('', [Validators.required]),
      GST_No: new FormControl('', [Validators.required]),
      Client_Status: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.GetAllClient();
  }

  GetAllClient() {
    this._rest.AllClients().subscribe((res: any) => {
      this.AllData = res.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AddClient() {
    this._rest.AddClients(this.AddClientDataForm.value).subscribe((res: any) => {
      alert(res.message);
      this.GetAllClient();
      this.AddClientDataForm.reset();
    });
  }

  editClient(Client_id: any) {
    const selectClient = this.AllData.find(Admin => Admin.Client_id === Client_id)
    if (selectClient) {
      this.SelectedClient = 1;
      this.EditClientDataForm.patchValue(selectClient);
    } else {
      console.log(`Client with Client ${Client_id} not found.`);
    }
  }

  updateStatus(event: any): void {
    this.EditClientDataForm.patchValue({
      Client_Status: event.target.checked ? 'Active' : 'Inactive'
    });
  }

  UpdateClient() {
    this._rest.UpdateClient(this.EditClientDataForm.value).subscribe((res: any) => {
      alert(res.message);
      this.GetAllClient();
      this.EditClientDataForm.reset();
    }, (err: any) => {
      console.log(err);
    });
  }

  DeleteClient(Client_id: any) {
    if (confirm("Are you sure to delete this Client?")) {
      this._rest.DeleteClient(Client_id).subscribe((res: any) => {
        alert(res.message);
        this.GetAllClient();
      }, (err: any) => {
        console.log(err);
      });
    }
  }


  exportexcel(): void {

    // STEP 4.1 – Create a new array for Excel
    const excelData = this.AllData.map((w: any, index: number) => {
      return {
        'Sr No': index + 1,
        'Client Code': w.Client_Code,
        'Client Name': w.Client_Name,
        'Phone No': w.Client_PhoneNo,
        'Client Email': w.Client_Email,
        'Client Address': w.Client_Address,
        'GST_No': w.GST_No,
        'Status': w.Client_Status,
        'Added_Date': w.Added_Date,
        'Updated Date': w.Updated_Date
      };
    });

    // STEP 4.2 – Convert JSON data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);

    // STEP 4.3 – Create workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // STEP 4.4 – Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AllWorkOrderData');

    // STEP 4.5 – Download Excel file
    XLSX.writeFile(workbook, 'Client.xlsx');

  }
}
