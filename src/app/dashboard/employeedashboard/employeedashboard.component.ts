import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent {
employeedata: any;

  constructor(private _rest: RestService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      this.employeedata = jwtDecode(token);
    }
  }
}
