import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 liked: boolean = false;
  Loginform: FormGroup;

  constructor(private _rest: RestService, private _router: Router, private _state: StateService) {
    this.Loginform = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
    });
  }

  ngonInit() {
    // Initialization logic here
  }

  Show() {
    this.liked = !this.liked;
  }
  login() {
    this._rest.Login(this.Loginform.value).subscribe(
      (res: any) => {

        console.log('Login Response:', res);

        const token = res.data;   // token string
        if (!token) {
          console.error('Token missing');
          return;
        }

        // ✅ SAVE TOKEN
        localStorage.setItem('token', token);
        this._state.token = token;

        // ✅ DECODE TOKEN
        const decoded = this._state.decodetoken(token);
        console.log('Decoded Token:', decoded);

        if (!decoded || !decoded.Role) {
          console.error('Role missing in token');
          return;
        }

        const role = decoded.Role;

        // ✅ ROLE-BASED NAVIGATION
        switch (role) {

          case 'SuperAdmin':
            this._router.navigate(['/AdminDashboard']);
            break;

          case 'Engineer':
            this._router.navigate(['/EmployeeDashboard']);
            break;

          case 'Accountant':
            this._router.navigate(['/AccountantDashboard']);
            break;

          case 'Manager':
            this._router.navigate(['/ManagerDashboard']);
            break;

          case 'QC':
            this._router.navigate(['/QCDashboard']);
            break;

          case 'Dispatch':
          case 'Dispatch Manager':   // IMPORTANT (your token has this)
            this._router.navigate(['/DispatchDashboard']);
            break;

          default:
            console.error('Unknown role:', role);
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
  }


  // login() {
  //   this._rest.Login(this.Loginform.value).subscribe((data: any) => {
  //     console.log(data);
  //     // this.toastr.success(data.message, 'success');
  //     localStorage.setItem('token', data.data);
  //     this._state.token = (data.data);
  //     if (data.Role === "SuperAdmin") {
  //       this._router.navigate(['/AdminDashboard']);
  //     }else if (data.Role === 'Employee') {
  //       this._router.navigate(['/EmployeeDashboard']);
  //     }else if (data.Role === 'Accountant') {
  //       this._router.navigate(['/AccountantDashboard']);
  //     }else if (data.Role === 'Manager') {
  //       this._router.navigate(['/ManagerDashboard']);
  //     }else if (data.Role === 'QC') {
  //       this._router.navigate(['/QCDashboard']);
  //     }else if (data.Role === 'Dispatch') {
  //       this._router.navigate(['/DispatchDashboard']);
  //     }
  //     this._state.decodetoken();

  //     // this._router.navigate(['/EmployeeDashboard']);
  //   }, (err: any) => {
  //     console.log(err);
  //     // this.toastr.error(err.message, 'Error');
  //   })
  // }
}
