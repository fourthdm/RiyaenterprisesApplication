import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewrequirement',
  templateUrl: './viewrequirement.component.html',
  styleUrls: ['./viewrequirement.component.css']
})
export class ViewrequirementComponent {

  AllRequirementData: any[] = [];
  RequirementitemUpdate: FormGroup;

  RequirementDetails: any = {};
  // AllRequirementData: any[] = [];

  constructor(private _RestService: RestService, private _activatedRoute: ActivatedRoute, private Sanitizer: DomSanitizer) {
    this.RequirementitemUpdate = new FormGroup({
      Item_Id: new FormControl(''),
      Product_Name: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      HSN_Code: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.Requirements();
  }

  // Requirements() {
  //   this._activatedRoute.params.subscribe(params => {
  //     const Req_id = params['Req_id'];

  //     this._RestService.Requirementdetails(Req_id).subscribe((res: any) => {

  //       // ✅ Correct way
  //       this.AllRequirementData = res.data?.items || [];

  //       console.log('Items:', this.AllRequirementData);
  //     });
  //   });
  // }

  Requirements() {
    this._activatedRoute.params.subscribe(params => {
      const Req_id = params['Req_id'];

      this._RestService.Requirementdetails(Req_id).subscribe((res: any) => {

        this.RequirementDetails = res.data;     // full data
        this.AllRequirementData = res.data?.items || []; // only items
    console.log('Items:', this.AllRequirementData);
      });
    });
  }
  // Requirements() {
  //   this._activatedRoute.params.subscribe(params => {
  //     const Req_id = params['Req_id'];
  //     this._RestService.Requirementdetails(Req_id).subscribe((res: any) => {
  //       this.AllRequirementData = Array.isArray(res.data)
  //         ? res.data
  //         : [res.data];
  //       console.log('Requirement Data:', this.AllRequirementData);
  //     });
  //   });
  // }

  deleteItem(Item_Id: any) {
    if (confirm("Delete this product?")) {
      this._RestService.deleteRequirementItem(Item_Id).subscribe((res: any) => {
        alert(res.message);
        this.Requirements();
      });
    }
  }

  SelectItem: any = undefined;
  editrequirementitems(Item_Id: any) {

    const selectedItem = this.AllRequirementData.find(
      item => item.Item_Id === Item_Id
    );

    if (selectedItem) {
      this.SelectItem = 1;

      this.RequirementitemUpdate.patchValue({
        Item_Id: selectedItem.Item_Id,
        Product_Name: selectedItem.Product_Name,
        Material_Type: selectedItem.Material_Type,
        Product_Quantity: selectedItem.Product_Quantity,
        HSN_Code: selectedItem.HSN_Code
      });
    }
  }
  // editrequirementitems(Item_Id: any) {
  //   const selectedItem = this.AllRequirementData.find(item => item.Item_Id === Item_Id);

  //   if (selectedItem) {
  //     this.SelectItem = 1;
  //     this.RequirementitemUpdate.patchValue(selectedItem);
  //   }
  // }

  UpdateRequirementitems() {
    if (this.RequirementitemUpdate.valid) {

      this._RestService.updateRequirementiems(this.RequirementitemUpdate.value)
        .subscribe((res: any) => {

          alert(res.message);

          // ✅ Refresh list after update
          this.Requirements();

          // ✅ Reset form
          this.RequirementitemUpdate.reset();

          // ✅ Hide edit mode
          this.SelectItem = null;

        }, (err: any) => {
          console.log(err);
        });

    }
  }

}

// editrequirementitems(Item_Id: any) {
//   const selectClient = this.AllRequirementData.find(Admin => Admin.Item_Id === Item_Id)
//   if (selectClient) {
//     this.SelectItem = 1;
//     this.RequirementitemUpdate.patchValue(selectClient);
//   } else {
//     console.log(`Requirement Items with Item  ${Item_Id} not found.`);
//   }
// }