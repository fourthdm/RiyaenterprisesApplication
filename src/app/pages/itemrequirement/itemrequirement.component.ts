import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemrequirement',
  templateUrl: './itemrequirement.component.html',
  styleUrls: ['./itemrequirement.component.css']
})
export class ItemrequirementComponent {
  reqForm!: FormGroup;
  requirementData: any;

  AllMaterials: any[] = [];

  AllclientData: any[] = [];

  allrequirement: any[] = [];
  pro: any;

  constructor(
    private fb: FormBuilder,
    private _rest: RestService
  ) { }

  ngOnInit() {
    this.reqForm = this.fb.group({
      Client_Name: [''],
      Client_Address: [''],
      Client_PhoneNo: [''],
      Client_Email: [''],
      GST_No: [''],
      Status: [''],
      products: this.fb.array([])
    });

    this.reqForm.get('Client_Name')!
      .valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(clientName => {
        this.autoFillByRequirement(clientName);
      });
    this.addProduct();
    this.Allmaterial();
    this.Allclient();
    this.AllRequirements()
  }

  Allmaterial() {
    this._rest.AllMaterials().subscribe((data: any) => {
      console.log(data);
      this.AllMaterials = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  Allclient() {
    this._rest.AllClients().subscribe((data: any) => {
      console.log(data);
      this.AllclientData = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AllRequirements() {
    this._rest.Allrequirementss().subscribe((data: any) => {
      console.log(data);
      this.allrequirement = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  get products() {
    return this.reqForm.get('products') as FormArray;
  }
  autoFillByRequirement(clientName: string) {
    const req = this.AllclientData.find(
      (r: any) => r.Client_Name === clientName
    );

    if (!req) return;

    this.reqForm.patchValue({
      Client_Address: req.Client_Address,
      Client_Email: req.Client_Email,
      Client_PhoneNo: req.Client_PhoneNo,
      GST_No: req.GST_No
    }, { emitEvent: false }); // ✅ STOP LOOP
  }

  addProduct() {
    this.products.push(
      this.fb.group({
        Product_Name: [''],
        Material_Type: [''],
        Product_Quantity: [''],
        HSN_Code: [''],
        Design_File: [null],
        PDFDesignfile: [null]
      })
    );
  }

  onFileChange(event: any, index: number, type: 'dwg' | 'pdf') {
    const file = event.target.files[0];
    if (!file) return;

    const controlName =
      type === 'dwg' ? 'Design_File' : 'PDFDesignfile';

    (this.products.at(index) as FormGroup).patchValue({
      [controlName]: file
    });
  }

  // onFileChange(event: any, index: number, type: 'dwg' | 'pdf') {
  //   const file = event.target.files[0];
  //   this.products.at(index).patchValue({ [type]: file });
  // }

  submit() {
    const formData = new FormData();

    // Requirement fields
    formData.append('Client_Name', this.reqForm.value.Client_Name);
    formData.append('Client_Address', this.reqForm.value.Client_Address);
    formData.append('Client_PhoneNo', this.reqForm.value.Client_PhoneNo);
    formData.append('Client_Email', this.reqForm.value.Client_Email);
    formData.append('GST_No', this.reqForm.value.GST_No);
    formData.append('Status', this.reqForm.value.Status);

    // Products JSON (WITHOUT files)
    formData.append(
      'products',
      JSON.stringify(
        this.reqForm.value.products.map((p: any) => ({
          Product_Name: p.Product_Name,
          Material_Type: p.Material_Type,
          Product_Quantity: p.Product_Quantity,
          HSN_Code: p.HSN_Code
        }))
      )
    );

    // Files (VERY IMPORTANT)
    this.reqForm.value.products.forEach((p: any, i: number) => {
      if (p.Design_File) {
        formData.append(`Design_File_${i}`, p.Design_File);
      }
      if (p.PDFDesignfile) {
        formData.append(`PDFDesignfile_${i}`, p.PDFDesignfile);
      }
    });
    this._rest.createRequirement(formData).subscribe(res => {
      alert('Requirement created with files');
      console.log(res);
      this.reqForm.reset();
    });
  }

  removeProduct(i: number) {
    this.products.removeAt(i);
  }

  // submit() {
  //   const formData = new FormData();

  //   const { products, ...reqData } = this.reqForm.value;

  //   Object.keys(reqData).forEach(key =>
  //     formData.append(key, reqData[key])
  //   );

  //   formData.append(
  //     'products',
  //     JSON.stringify(
  //       products.map((p: any) => ({
  //         Product_Name: p.Product_Name,
  //         Material_Type: p.Material_Type,
  //         Product_Quantity: p.Product_Quantity,
  //         HSN_Code: p.HSN_Code
  //       }))
  //     )
  //   );

  //   products.forEach((p: any, i: number) => {
  //     if (p.Design_File) formData.append(`dwg_${i}`, p.Design_File);
  //     if (p.PDFDesignfile) formData.append(`pdf_${i}`, p.PDFDesignfile);
  //   });

  // this._rest.createRequirement(formData).subscribe(res => {
  //   alert('Requirement created with files');
  //   console.log(res);
  // });
  // }
}
