import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewchallan',
  templateUrl: './viewchallan.component.html',
  styleUrls: ['./viewchallan.component.css']
})
export class ViewchallanComponent {
  AllChallans: any[] = [];

  constructor(private _rest: RestService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(params => {
      const Challan_Id = params['Challan_Id'];
      this._rest.ViewChallans(Challan_Id).subscribe((data: any) => {
        console.log(data);
        this.AllChallans = Array.isArray(data.data)
          ? data.data
          : [data.data];
      });
    });
  }
}
