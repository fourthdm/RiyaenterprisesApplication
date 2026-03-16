import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-engineerworkorder',
  templateUrl: './engineerworkorder.component.html',
  styleUrls: ['./engineerworkorder.component.css']
})
export class EngineerworkorderComponent {
 AllEngineerorders: any[] = [];
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

  constructor(private _rest: RestService, private _state: StateService) {
    this.AddWorkorderForm = new FormGroup({
      Engineer_Status: new FormControl('')
    });

    this.EditWorkorderForm = new FormGroup({
      Workorder_Id: new FormControl(''),
      Engineer_Status: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.AllEngineerworkorder();
  }

  AllEngineerworkorder() {
    this._rest.WorkorderforEngineer().subscribe((data: any) => {
      console.log(data);
      this.AllEngineerorders = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }


  AddWorkOrderData() {
    this._rest.AddWorkOrder(this.AddWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllEngineerworkorder();
      this.AddWorkorderForm.reset();
    }, (err: any) => {
      console.log(err);
      alert('Error while adding work Order');
    });
  }

  EditPurchaseOrder(Workorder_Id: any) {
    const selectworkorder = this.AllEngineerorders.find(purchaseorder => purchaseorder.Workorder_Id === Workorder_Id)
    if (selectworkorder) {
      this.SelectedWorkOrderData = 1;
      this.EditWorkorderForm.patchValue(selectworkorder);
    } else {
      console.log(`Workorder Order with ID ${Workorder_Id} not found.`);
    }
  }

  UpdatePurchaseOrder() {
    this._rest.UpdateEngineeerstatus(this.EditWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllEngineerworkorder();
      this.EditWorkorderForm.reset();
      this.ngOnInit();
    }, (err: any) => {
      console.log(err);
      alert('Error while Updating Engineer Status');
    });
  }

  downloadFromUrl(fileUrl: string) {
    const fileName = fileUrl.split('/').pop();   // extract file name

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName ?? 'file';   // force download
    a.target = "_blank";
    a.click();
  }
}
