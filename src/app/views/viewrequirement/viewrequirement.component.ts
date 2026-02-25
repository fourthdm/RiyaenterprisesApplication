import { Component } from '@angular/core';
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

  constructor(private _RestService: RestService, private _activatedRoute: ActivatedRoute, private Sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this._activatedRoute.params.subscribe(params => {
      const Req_id = params['Req_id'];

      this._RestService.Requirementdetails(Req_id).subscribe((res: any) => {
        this.AllRequirementData = Array.isArray(res.data)
          ? res.data
          : [res.data];

        console.log('Requirement Data:', this.AllRequirementData);
      });
    });
  }
}