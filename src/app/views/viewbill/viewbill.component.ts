import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewbill',
  templateUrl: './viewbill.component.html',
  styleUrls: ['./viewbill.component.css']
})
export class ViewbillComponent {
  AllBills: any[] = [];

  constructor(private _rest: RestService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(params => {
      const Bill_Id = params['Bill_Id'];
      this._rest.ViewBills(Bill_Id).subscribe((data: any) => {
        this.AllBills = Array.isArray(data.data)
          ? data.data
          : [data.data];
      });
    });
  }
}
