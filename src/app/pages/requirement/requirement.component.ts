import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent {

  Requirementform!: FormGroup;
  AllMaterials: any[] = [];

  AllclientData: any[] = [];

  constructor(private fb: FormBuilder, private _rest: RestService) {
    this.Requirementform = this.fb.group({
      Client_Name: ['', Validators.required],
      Client_Address: ['', Validators.required],
      Client_PhoneNo: ['', Validators.required],
      Client_Email: ['', [Validators.required, Validators.email]],
      GST_No: ['', [Validators.required]],
      Status: ['', Validators.required],
      products: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.Requirementform.get('Client_Name')!
      .valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(clientName => {
        this.autoFillByRequirement(clientName);
      });

    this.addProduct();
    this.Allmaterial();
    this.Allclient();
    // this.Requirementform.get('Client_Name')?.valueChanges
    //   .subscribe(clientName => {
    //     if (clientName) {
    //       this.autoFillByRequirement(clientName);
    //     }
    //   });

    // this.addProduct(); // 🔥 at least one product
    // this.Allmaterial();
    // this.Allclient();
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

  // autoFillByRequirement(clientName: string) {
  //   const req = this.AllclientData.find(
  //     (r: any) => r.Client_Name === clientName
  //   );

  //   if (!req) return;

  //   this.Requirementform.patchValue({
  //     Client_Name: req.Client_Name,
  //     Client_Address: req.Client_Address,
  //     Client_Email: req.Client_Email,
  //     Client_PhoneNo: req.Client_PhoneNo,
  //     GST_No: req.GST_No
  //   });
  // }

  autoFillByRequirement(clientName: string) {
    const req = this.AllclientData.find(
      (r: any) => r.Client_Name === clientName
    );

    if (!req) return;

    this.Requirementform.patchValue({
      Client_Address: req.Client_Address,
      Client_Email: req.Client_Email,
      Client_PhoneNo: req.Client_PhoneNo,
      GST_No: req.GST_No
    }, { emitEvent: false }); // ✅ STOP LOOP
  }

  // -------------------------
  // PRODUCTS FORM ARRAY
  // -------------------------
  get products(): FormArray {
    return this.Requirementform.get('products') as FormArray;
  }

  createProduct(): FormGroup {
    return this.fb.group({
      Product_Name: ['', Validators.required],
      Material_Type: ['', Validators.required],
      Product_Quantity: ['', Validators.required],
      Design_File: [null],
      PDFDesignfile: [null],
      HSN_Code: ['', Validators.required]
    });
  }

  addProduct() {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  onSubmit() {
    if (this.Requirementform.invalid) {
      alert('Fill all required fields');
      return;
    }

    const formData = new FormData();

    // HEADER DATA
    formData.append('Client_Name', this.Requirementform.value.Client_Name);
    formData.append('Client_Address', this.Requirementform.value.Client_Address);
    formData.append('Client_PhoneNo', this.Requirementform.value.Client_PhoneNo);
    formData.append('Client_Email', this.Requirementform.value.Client_Email);
    formData.append('GST_No', this.Requirementform.value.GST_No);
    formData.append('Status', this.Requirementform.value.Status);

    // PRODUCTS DATA
    this.products.controls.forEach((prod, index) => {
      formData.append(`products[${index}][Product_Name]`, prod.value.Product_Name);
      formData.append(`products[${index}][Material_Type]`, prod.value.Material_Type);
      formData.append(`products[${index}][Product_Quantity]`, prod.value.Product_Quantity);
      formData.append(`products[${index}][HSN_Code]`, prod.value.HSN_Code);

      if (prod.value.Design_File) {
        formData.append(`Design_File_${index}`, prod.value.Design_File);
      }

      if (prod.value.PDFDesignfile) {
        formData.append(`PDFDesignfile_${index}`, prod.value.PDFDesignfile);
      }
    });

    this._rest.AddRequirement(formData).subscribe(res => {
      alert('Requirement added with multiple products');
      this.Requirementform.reset();
      this.products.clear();
      this.addProduct();
    });
  }

  // -------------------------
  // FILE HANDLERS
  // -------------------------
  // products: any[] = [
  //   {
  //     Product_Name: '',
  //     Material_Type: '',
  //     Product_Quantity: '',
  //     HSN_Code: '',
  //     Design_File: null,
  //     PDFDesignfile: null
  //   }
  // ];

  // onDesignFile(event: any, index: number) {
  //   this.products[index].Design_File = event.target.files[0];
  // }

  // onPdfFile(event: any, index: number) {
  //   this.products[index].PDFDesignfile = event.target.files[0];
  // }

  onDesignFileSelect(event: any, index: number) {
    const file = event.target.files[0];
    this.products.at(index).patchValue({ Design_File: file });
  }

  onPDFFileSelect(event: any, index: number) {
    const file = event.target.files[0];
    this.products.at(index).patchValue({ PDFDesignfile: file });
  }

  // -------------------------
  // SUBMIT
  // -------------------------

  // onSubmit() {
  //   if (this.Requirementform.invalid) {
  //     alert('Form invalid');
  //     return;
  //   }

  //   const formData = new FormData();

  //   // HEADER
  //   Object.entries(this.Requirementform.value).forEach(([key, value]) => {
  //     if (key !== 'products') {
  //       formData.append(key, value as string);
  //     }
  //   });

  //   // PRODUCTS (IMPORTANT)
  //   this.products.controls.forEach((prod, index) => {

  //     formData.append(`products[${index}][Product_Name]`,
  //       prod.get('Product_Name')?.value || ''
  //     );
  //     formData.append(`products[${index}][Material_Type]`,
  //       prod.get('Material_Type')?.value || ''
  //     );
  //     formData.append(`products[${index}][Product_Quantity]`,
  //       prod.get('Product_Quantity')?.value || ''
  //     );
  //     formData.append(`products[${index}][HSN_Code]`,
  //       prod.get('HSN_Code')?.value || ''
  //     );

  //     const designFile = prod.get('Design_File')?.value;
  //     const pdfFile = prod.get('PDFDesignfile')?.value;

  //     if (designFile instanceof File) {
  //       formData.append(`Design_File_${index}`, designFile);
  //     }

  //     if (pdfFile instanceof File) {
  //       formData.append(`PDFDesignfile_${index}`, pdfFile);
  //     }
  //   });

  //   // 🔍 DEBUG (VERY IMPORTANT)
  //   for (let pair of formData.entries()) {
  //     console.log(pair[0], pair[1]);
  //   }

  //   this._rest.AddRequirement(formData).subscribe({
  //     next: res => console.log('SUCCESS', res),
  //     error: err => console.error('API ERROR', err)
  //   });
  // }

  // onSubmit() {
  //   if (this.Requirementform.invalid) {
  //     alert('Please fill all required fields');
  //     return;
  //   }

  //   const formData = new FormData();

  //   // HEADER
  //   formData.append('Client_Name', this.Requirementform.value.Client_Name);
  //   formData.append('Client_Address', this.Requirementform.value.Client_Address);
  //   formData.append('Client_PhoneNo', this.Requirementform.value.Client_PhoneNo);
  //   formData.append('Client_Email', this.Requirementform.value.Client_Email);
  //   formData.append('GST_No', this.Requirementform.value.GST_No);
  //   formData.append('Status', this.Requirementform.value.Status);

  //   // PRODUCTS
  //   // this.products.controls.forEach((prod, index) => {
  //   //   formData.append(`products[${index}][Product_Name]`, prod.value.Product_Name);
  //   //   formData.append(`products[${index}][Material_Type]`, prod.value.Material_Type);
  //   //   formData.append(`products[${index}][Product_Quantity]`, prod.value.Product_Quantity);
  //   //   formData.append(`products[${index}][HSN_Code]`, prod.value.HSN_Code);

  //   //   if (prod.value.Design_File) {
  //   //     formData.append(`Design_File_${index}`, prod.value.Design_File);
  //   //   }

  //   //   if (prod.value.PDFDesignfile) {
  //   //     formData.append(`PDFDesignfile_${index}`, prod.value.PDFDesignfile);
  //   //   }
  //   // });
  //   this.products.controls.forEach((prod, index) => {

  //     formData.append(`products[${index}][Product_Name]`, prod.get('Product_Name')!.value);
  //     formData.append(`products[${index}][Material_Type]`, prod.get('Material_Type')!.value);
  //     formData.append(`products[${index}][Product_Quantity]`, prod.get('Product_Quantity')!.value);
  //     formData.append(`products[${index}][HSN_Code]`, prod.get('HSN_Code')!.value);

  //     const designFile = prod.get('Design_File')!.value;
  //     const pdfFile = prod.get('PDFDesignfile')!.value;

  //     if (designFile) {
  //       formData.append(`Design_File_${index}`, designFile);
  //     }

  //     if (pdfFile) {
  //       formData.append(`PDFDesignfile_${index}`, pdfFile);
  //     }
  //   });
  //   // API CALL
  //   this._rest.AddRequirement(formData).subscribe({
  //     next: (res: any) => {
  //       alert('Requirement created successfully');
  //       this.Requirementform.reset();
  //       this.products.clear();
  //       this.addProduct();
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('Error while creating requirement');
  //     }
  //   });
  // }
}
