import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-dashboardnavbar',
  templateUrl: './dashboardnavbar.component.html',
  styleUrls: ['./dashboardnavbar.component.css']
})
export class DashboardnavbarComponent {
  employeedata: any;

  isManager: boolean = false;
  isQC: boolean = false;
  isEngineer: boolean = false;
  isDispatchManager: boolean = false;

  notifications: any[] = [];
  alertCount = 0;

  constructor(private _rest: RestService, private _activatedroute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.getManager();
    this.Getdispatchmanager();
    this.getQC();
    this.getEngineer();

    const token = localStorage.getItem('token');
    if (token) {
      this.employeedata = jwtDecode(token);
    }
    // this.loadNotifications();

    this.billstatus();
  }

  Logout() {
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }

  getManager() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role == 'Manager') {
        this.isManager = true;
      } else {
        this.isManager = false;
      }
    }
  }

  getQC() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role == 'QC') {
        this.isQC = true;
      } else {
        this.isQC = false;
      }
    }
  }

  getEngineer() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role == 'Engineer') {
        this.isEngineer = true;
      } else {
        this.isEngineer = false;
      }
    }
  }

  Getdispatchmanager() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role == 'Dispatch Manager') {
        this.isDispatchManager = true;
      } else {
        this.isDispatchManager = false;
      }
    }
  }

  billStatus: any;
  challanAllowed = false;
  PurchaseNumber: string = '';

  billstatus() {
    this._rest.getBillStatusByPO(this.PurchaseNumber).subscribe((res: any) => {
      if (res.success) {
        this.billStatus = res.data;

        this.challanAllowed =
          res.data.Bill_Status === 'Generate'
      } else {
        this.challanAllowed = false;
      }
    });
  }


  // isDueSoon(dueDate: string): boolean {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const due = new Date(dueDate);
  //   due.setHours(0, 0, 0, 0);

  //   const diffDays = Math.ceil(
  //     (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  //   );

  //   return diffDays >= 0 && diffDays <= 3;
  // }

  // loadNotifications() {
  //   this._rest.getNotifications('Manager')
  //     .subscribe(data => {
  //       this.notifications = data;

  //       this.alertCount = data.filter(n =>
  //         n.Status === 'Unread'
  //       ).length;
  //     });
  // }
  // loadNotifications() {
  //   this._rest.getNotifications('Manager')
  //     .subscribe(data => {
  //       this.notifications = data;
  //       this.alertCount = data.filter(n => n.Status === 'Unread').length;
  //     });
  // }
  // loadNotifications() {
  //   this._rest.getNotifications('Manager').subscribe(data => {
  //     this.notifications = data;
  //     this.alertCount = this.notifications.filter(n =>
  //       this.isDueSoon(n.Due_Date) && n.Status === 'Unread'
  //     ).length;
  //     // this.alertCount = data.filter(n => n.Status === 'Unread').length;
  //   });
  // }

}
