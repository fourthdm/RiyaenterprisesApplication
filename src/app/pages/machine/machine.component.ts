import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent {
  
  fileName = 'Machine.xlsx';

  pro: any;
  isAdmin: boolean = false;

  AddMachineForm: FormGroup;
  EditMachineForm: FormGroup;

  ALLMachine: any[] = [];
  selectedMachine: any = null;

  constructor(private _rest: RestService) {
    this.AddMachineForm = new FormGroup({
      Machine_Name: new FormControl('', [Validators.required]),
      Machine_Number: new FormControl('', [Validators.required]),
      Machine_Status: new FormControl(false)
    });

    this.EditMachineForm = new FormGroup({
      Machine_id: new FormControl(''),
      Machine_Code: new FormControl('', [Validators.required]),
      Machine_Name: new FormControl('', [Validators.required]),
      Machine_Number: new FormControl('', [Validators.required]),
      Machine_Status: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.AllMachines();
  }

  AddMachine() {
    this._rest.AddMachine(this.AddMachineForm.value).subscribe((data: any) => {
      console.log("Machine Added", data);
      this.ALLMachine = data.data;
      this.AddMachineForm.reset();
    }, (err: any) => {
      console.error("Error adding machine", err);
    });
  }

  AllMachines() {
    this._rest.AllMachine().subscribe((data: any) => {
      this.ALLMachine = data.data;
      this.ngOnInit();
    }, (err: any) => {
      console.error("Error fetching machines", err);
    });
  }

  ToggleStatus(event: any): void {
    const value = parseInt(event.target.value, 10);
    this.AddMachineForm.patchValue({
      Machine_Status: value
    });
  }

  // ToggleStatus(event: any): void {
  //   this.AddMachineForm.patchValue({
  //     Machine_Status: event.target.checked ? 1 : 0
  //   });
  // }

  updateStatus(event: any): void {
    const value = parseInt(event.target.value, 10);
    this.AddMachineForm.patchValue({
      Machine_Status: value
    });
    // this.EditMachineForm.patchValue({
    //   Machine_Status: event.target.checked ? 1 : 0
    // });
  }

  EditMachine(Machine_id: any) {
    const MachineSelected = this.ALLMachine.find(m => m.Machine_id === Machine_id);
    if (MachineSelected) {
      this.selectedMachine = 1;
      this.EditMachineForm.patchValue(MachineSelected);
    }
  }

  UpadateMachine() {
    this._rest.UpdateMachine(this.EditMachineForm.value).subscribe((data: any) => {
      console.log(data);
      this.ALLMachine = data.data;
      this.AllMachines();
      this.EditMachineForm.reset();
    }, (err: any) => {
      console.log(err);
    });
  }

  DeleteMachine(Machine_id: number) {
    this._rest.DeleteMachine(Machine_id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
      // this.ALLMachine = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
