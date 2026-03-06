import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewworkorder',
  templateUrl: './viewworkorder.component.html',
  styleUrls: ['./viewworkorder.component.css']
})
export class ViewworkorderComponent implements OnInit {

  AllWorkOrder: any[] = [];

  constructor(private _rest: RestService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      const Workorder_Id = params['Workorder_Id'];
      this._rest.WorkorderbyId(Workorder_Id).subscribe((data: any) => {
        this.AllWorkOrder = Array.isArray(data.data)
          ? data.data
          : [data.data]
      });
    });
  }

}
