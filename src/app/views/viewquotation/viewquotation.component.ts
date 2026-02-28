import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewquotation',
  templateUrl: './viewquotation.component.html',
  styleUrls: ['./viewquotation.component.css']
})
export class ViewquotationComponent implements OnInit {

  AllQuotations: any[] = [];

  constructor(private _rest: RestService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(params => {
      const Quotation_Id = params['Quotation_Id'];
      this._rest.QuotationByid(Quotation_Id).subscribe((data: any) => {
        this.AllQuotations = Array.isArray(data.data)
          ? data.data
          : [data.data];
      });
    });
  }


}
