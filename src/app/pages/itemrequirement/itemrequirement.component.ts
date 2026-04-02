import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemrequirement',
  templateUrl: './itemrequirement.component.html',
  styleUrls: ['./itemrequirement.component.css']
})
export class ItemrequirementComponent {

  @Input() Added_Date: any;

  reqForm!: FormGroup;
  requirementData: any;

  UpdateRequirementform: FormGroup;
  Selectedrequirement: any = undefined;

  AllMaterials: any[] = [];
  AllclientData: any[] = [];
  allrequirement: any[] = [];
  pro: any;

  constructor(
    private fb: FormBuilder,
    private _rest: RestService
  ) {
    this.UpdateRequirementform = this.fb.group({
      Req_id: [''],
      Client_Name: ['', Validators.required],
      Client_Address: ['', Validators.required],
      Client_PhoneNo: ['', Validators.required],
      Client_Email: ['', [Validators.required, Validators.email]],
      GST_No: ['', [Validators.required]],
      Status: ['', Validators.required],
      Discount_Amount: [0],
      items: this.fb.array([])
    });
  }

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

  get items(): FormArray {
    return this.UpdateRequirementform.get('items') as FormArray;
  }

  // addUpdateItem(item: any = null) {
  //   this.items.push(
  //     this.fb.group({
  //       Item_Id: [item?.Item_Id || null],   // ✅ IMPORTANT
  //       Product_Name: [item?.Product_Name || ''],
  //       Material_Type: [item?.Material_Type || ''],
  //       Product_Quantity: [item?.Product_Quantity || ''],
  //       HSN_Code: [item?.HSN_Code || ''],
  //       Rate: [item?.Rate || 0],                         // ✅ FIX
  //       Manufacturing_Cost: [item?.Manufacturing_Cost || 0], // ✅ FIX
  //       Material_Cost: [item?.Material_Cost || 0],       // ✅ FIX
  //       Dispatch_Cost: [item?.Dispatch_Cost || 0]        // ✅ FIX
  //     })
  //   );
  // }

  // addUpdateItem(data: any = null) {
  //   this.items.push(
  //     this.fb.group({
  //       //  👈 important
  //       Item_Id: [data?.Item_Id || null], //
  //       Product_Name: [data?.Product_Name || ''],
  //       Material_Type: [data?.Material_Type || ''],
  //       Product_Quantity: [data?.Product_Quantity || ''],
  //       HSN_Code: [data?.HSN_Code || ''],
  //       Rate: [data?.Rate || 0],
  //       Manufacturing_Cost: [data?.Manufacturing_Cost || 0],
  //       Material_Cost: [data?.Material_Cost || 0],
  //       Dispatch_Cost: [data?.Dispatch_Cost || 0]
  //     })
  //   );
  // }

  addUpdateItem(item: any = null) {
    this.items.push(
      this.fb.group({
        Item_Id: [item?.Item_Id || null],
        Product_Name: [item?.Product_Name || ''],
        Material_Type: [item?.Material_Type || ''],
        Product_Quantity: [item?.Product_Quantity || ''],
        HSN_Code: [item?.HSN_Code || ''],

        // ✅ THESE ARE THE MAIN FIX
        Rate: [item?.Rate || 0],
        Manufacturing_Cost: [item?.Manufacturing_Cost || 0],
        Material_Cost: [item?.Material_Cost || 0],
        Dispatch_Cost: [item?.Dispatch_Cost || 0]
      })
    );
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
        PDFDesignfile: [null],
        Design_File_Name: [''],
        PDF_File_Name: ['']
      })
    );
  }

  // onFileChange(event: any, index: number, type: 'dwg' | 'pdf') {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const controlName =
  //     type === 'dwg' ? 'Design_File' : 'PDFDesignfile';

  //   (this.products.at(index) as FormGroup).patchValue({
  //     [controlName]: file
  //   });
  // }

  onFileChange(event: any, index: number, type: 'dwg' | 'pdf') {
    const file = event.target.files[0];
    if (!file) return;

    const product = this.products.at(index) as FormGroup;

    if (type === 'dwg') {
      product.patchValue({
        Design_File: file,
        Design_File_Name: file.name
      });
    }

    if (type === 'pdf') {
      product.patchValue({
        PDFDesignfile: file,
        PDF_File_Name: file.name
      });
    }
  }

  deleteItem(Item_Id: any) {
    if (confirm("Delete this product?")) {
      this._rest.deleteRequirementItem(Item_Id).subscribe((res: any) => {
        alert(res.message);
        this.AllRequirements();
      });
    }
  }

  requirementbyDate() {
    this._rest.Requirementbydate({ Added_Date: this.Added_Date }).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        this.allrequirement = data.data;
      }
      else {
        alert(data.message);
        this.ngOnInit();
      }
    })
  }

  // onFileChange(event: any, index: number, type: 'dwg' | 'pdf') {

  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const controlName = type === 'dwg'
  //     ? 'Design_File'
  //     : 'PDFDesignfile';

  //   const product = this.products.at(index) as FormGroup;

  //   product.patchValue({
  //     [controlName]: file
  //   });

  // }

  submit() {
    const formData = new FormData();

    formData.append('Client_Name', this.reqForm.value.Client_Name);
    formData.append('Client_Address', this.reqForm.value.Client_Address);
    formData.append('Client_PhoneNo', this.reqForm.value.Client_PhoneNo);
    formData.append('Client_Email', this.reqForm.value.Client_Email);
    formData.append('GST_No', this.reqForm.value.GST_No);
    formData.append('Status', this.reqForm.value.Status);

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

    this.reqForm.value.products.forEach((p: any, i: number) => {
      if (p.Design_File) {
        formData.append(`Design_File_${i}`, p.Design_File);
      }

      if (p.PDFDesignfile) {
        formData.append(`PDFDesignfile_${i}`, p.PDFDesignfile);
      }
    });

    this._rest.createRequirement(formData).subscribe(res => {

      alert('Requirement created successfully');

      this.reqForm.reset();

      this.products.clear();     // ⭐ IMPORTANT
      this.addProduct();         // ⭐ Add first product again

      this.AllRequirements();    // refresh table

    });
  }

  removeProduct(i: number) {
    this.products.removeAt(i);
  }
  // editRequirement(Req_id: any) {
  //   const Requireselect = this.allrequirement.find(requirement => requirement.Req_id === Req_id);
  //   if (Requireselect) {
  //     this.Selectedrequirement = 1,
  //       this.UpdateRequirementform.patchValue(Requireselect);
  //   }
  // }

  editRequirement(Req_id: any) {

    const req = this.allrequirement.find(r => r.Req_id === Req_id);

    if (!req) return;

    this.Selectedrequirement = 1;

    this.UpdateRequirementform.patchValue({
      Req_id: req.Req_id,
      Client_Name: req.Client_Name,
      Client_Address: req.Client_Address,
      Client_PhoneNo: req.Client_PhoneNo,
      Client_Email: req.Client_Email,
      GST_No: req.GST_No,
      Status: req.Status,
      Discount_Amount: req.Discount_Amount || 0
    });

    // ✅ CLEAR OLD ITEMS
    this.items.clear();

    // ✅ LOAD ITEMS (IMPORTANT)
    req.items.forEach((item: any) => {
      this.addUpdateItem(item);
    });
  }

  updateRequirement() {

    const payload = {
      ...this.UpdateRequirementform.value,
      Discount_Amount: this.UpdateRequirementform.value.Discount_Amount || 0, // ✅ FIX
      items: this.UpdateRequirementform.value.items // ✅ correct
    };

    const Req_id = this.UpdateRequirementform.value.Req_id;

    this._rest.UpdateFullrequirement(Req_id, payload)
      .subscribe({
        next: (res: any) => {
          alert("Updated Successfully");
          this.AllRequirements();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  DeleteRequirement(Req_id: any) {
    if (confirm("Delete this requirement?")) {
      this._rest.DeleteRequirement(Req_id).subscribe((res: any) => {
        alert(res.message);
        this.AllRequirements();
      });
    }
  }

  // updateRequirement() {

  //   const payload = {
  //     Client_Name: this.UpdateRequirementform.value.Client_Name,
  //     Client_Address: this.UpdateRequirementform.value.Client_Address,
  //     Client_PhoneNo: this.UpdateRequirementform.value.Client_PhoneNo,
  //     Client_Email: this.UpdateRequirementform.value.Client_Email,
  //     GST_No: this.UpdateRequirementform.value.GST_No,
  //     Status: this.UpdateRequirementform.value.Status,

  //     items: this.itemsArray // 👈 important
  //   };

  //   this._rest.UpdateFullrequirement(this.Req_id, payload)
  //     .subscribe({
  //       next: (res: any) => {
  //         alert("Updated Successfully");
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       }
  //     });
  // }

  // submit() {
  //   const formData = new FormData();

  //   // Requirement fields
  //   formData.append('Client_Name', this.reqForm.value.Client_Name);
  //   formData.append('Client_Address', this.reqForm.value.Client_Address);
  //   formData.append('Client_PhoneNo', this.reqForm.value.Client_PhoneNo);
  //   formData.append('Client_Email', this.reqForm.value.Client_Email);
  //   formData.append('GST_No', this.reqForm.value.GST_No);
  //   formData.append('Status', this.reqForm.value.Status);

  //   // Products JSON (WITHOUT files)
  //   formData.append(
  //     'products',
  //     JSON.stringify(
  //       this.reqForm.value.products.map((p: any) => ({
  //         Product_Name: p.Product_Name,
  //         Material_Type: p.Material_Type,
  //         Product_Quantity: p.Product_Quantity,
  //         HSN_Code: p.HSN_Code
  //       }))
  //     )
  //   );

  //   // Files (VERY IMPORTANT)
  //   this.reqForm.value.products.forEach((p: any, i: number) => {
  //     if (p.Design_File) {
  //       formData.append(`Design_File_${i}`, p.Design_File);
  //     }
  //     if (p.PDFDesignfile) {
  //       formData.append(`PDFDesignfile_${i}`, p.PDFDesignfile);
  //     }
  //   });
  //   this._rest.createRequirement(formData).subscribe(res => {
  //     alert('Requirement created with files');
  //     console.log(res);
  //     this.reqForm.reset();
  //   });
  // }

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
