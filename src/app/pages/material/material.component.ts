import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {
  fileName = 'Material.xlsx';

  pro: any;
  AllMAterials: any[] = [];

  MaterialTypes: any[] = [];

  MaterialAddForms: FormGroup;
  EditMaterialForms: FormGroup;

  SelectedMaterial: any = undefined;

  @Input() Material_Weight: any;
  @Input() Material_Size: any;
  @Input() Material_Name: any;
  @Input() Material_Type: any;

  constructor(private _rest: RestService) {
    this.MaterialAddForms = new FormGroup({
      Material_Name: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Material_Size: new FormControl('', [Validators.required]),
      Material_Weight: new FormControl('', [Validators.required]),
      Material_Status: new FormControl(false)
    });

    this.EditMaterialForms = new FormGroup({
      Material_id: new FormControl(''),
      Material_Name: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Material_Size: new FormControl('', [Validators.required]),
      Material_Weight: new FormControl('', [Validators.required]),
      Material_Status: new FormControl(false)
    })
  }

  ngOnInit(): void {
    this.AllMaterial();
    this.AllMaterialTypes();
  }

  AllMaterial() {
    this._rest.AllMaterials().subscribe((data: any) => {
      console.log(data);
      this.AllMAterials = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  ToggleStatus(event: any): void {
    this.MaterialAddForms.patchValue({
      Machine_Status: event.target.checked ? 1 : 0
    });
  }

  updateStatus(event: any): void {
    this.EditMaterialForms.patchValue({
      Machine_Status: event.target.checked ? 1 : 0
    });
  }

  AddMaterial() {
    this._rest.AddMAterialS(this.MaterialAddForms.value).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
      this.MaterialAddForms.reset();
    }, (err: any) => {
      console.log(err);
    });
  }

  formatWeight(): void {
    let weight = this.MaterialAddForms.get('Material_Weight')?.value;

    if (weight) {
      weight = weight.toString().trim();

      // Allow only numbers and optional decimal
      const numericValue = weight.replace(/[^0-9.]/g, '');

      // Append " kg" (always lowercase)
      if (numericValue) {
        this.MaterialAddForms.patchValue({
          Material_Weight: `${numericValue} Kg`
        });
      }
    }
  }
  formatMaterialWeight(): void {
    let weight = this.EditMaterialForms.get('Material_Weight')?.value;

    if (weight) {
      weight = weight.toString().trim();

      // Allow only numbers and optional decimal
      const numericValue = weight.replace(/[^0-9.]/g, '');

      // Append " kg" (always lowercase)
      if (numericValue) {
        this.EditMaterialForms.patchValue({
          Material_Weight: `${numericValue} Kg`
        });
      }
    }
  }

  AllMaterialTypes() {
    this._rest.AllMaterialTypes().subscribe((data: any) => {
      console.log(data);
      this.MaterialTypes = data.data;
    }, (err: any) => {
      console.log(err);
    })
  }

  EditMaterial(Material_id: any) {
    const Material = this.AllMAterials.find(m => m.Material_id === Material_id);
    if (Material) {
      this.SelectedMaterial = 1;
      this.EditMaterialForms.patchValue(Material);
    }
  }

  UpdateMaterial() {
    this._rest.UpdateMaterial(this.EditMaterialForms.value).subscribe((data: any) => {
      console.log(data);
      this.AllMAterials = data.data;
      this.EditMaterialForms.reset();
    }, (err: any) => {
      console.log(err);
    });
  }

  MaterialByWeight() {
    this._rest.MaterialByWeights({ Material_Weight: this.Material_Weight }).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        this.AllMAterials = data.data;
      } else {
        this.AllMaterial();
      }
    });
  }

  MaterialByName() {
    this._rest.MaterialByName({ Material_Name: this.Material_Name }).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        this.AllMAterials = data.data;
      } else {
        this.AllMaterial();
      }
    });
  }

  MaterialByType() {
    this._rest.MaterialByType({ Material_Type: this.Material_Type }).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        this.AllMAterials = data.data;
      } else {
        this.AllMaterial();
      }
    });
  }

  MaterialBySize() {
    this._rest.MaterialBySize({ Material_Size: this.Material_Size }).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        this.AllMAterials = data.data;
      } else {
        this.AllMaterial();
      }
    });
  }

  DeleteMaterial(Material_id: number) {
    if (confirm('Are you Sure to Delete a Material Record')) {
      this._rest.DeleteMaterial(Material_id).subscribe((data: any) => {
        console.log(data);
        this.AllMAterials = data.data;
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
      });
    }
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
