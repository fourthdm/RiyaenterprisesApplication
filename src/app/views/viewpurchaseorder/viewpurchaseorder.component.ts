import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewpurchaseorder',
  templateUrl: './viewpurchaseorder.component.html',
  styleUrls: ['./viewpurchaseorder.component.css']
})
export class ViewpurchaseorderComponent implements OnInit {
  AllPurchaseOrder: any[] = [];

  constructor(private _rest: RestService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(params => {
      const Purchase_id = params['Purchase_id'];
      this._rest.ByidAllPurchaseOrder(Purchase_id).subscribe((data: any) => {
        this.AllPurchaseOrder = Array.isArray(data.data)
          ? data.data
          : [data.data];
      });
    });
  }

}
