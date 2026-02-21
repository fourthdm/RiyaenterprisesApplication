import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  token = '';
  report : any = undefined;

  constructor(private _router : Router) { }

  decodetoken(token: string): any {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
}

  // decodetoken (){
  //   this.report = jwtDecode(this.token);
  //   return this.report;
  // }

  checktoken(){
    const token = localStorage.getItem('token');
    if(token){
      this.token = token;
      this.decodetoken(token);
    }else{
      this._router.navigate(['/login']);
    }
  }
}
