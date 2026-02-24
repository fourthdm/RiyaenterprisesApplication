import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardnavbarComponent } from './common/dashboardnavbar/dashboardnavbar.component';
import { EmployeedetailsComponent } from './common/employeedetails/employeedetails.component';
import { LoginComponent } from './common/login/login.component';
import { DispatchmanagerworkorderComponent } from './workorders/dispatchmanagerworkorder/dispatchmanagerworkorder.component';
import { EngineerworkorderComponent } from './workorders/engineerworkorder/engineerworkorder.component';
import { QcworkorderComponent } from './workorders/qcworkorder/qcworkorder.component';
import { ManagerworkorderComponent } from './workorders/managerworkorder/managerworkorder.component';
import { AccountantdashboardComponent } from './dashboard/accountantdashboard/accountantdashboard.component';
import { AdmindashboardComponent } from './dashboard/admindashboard/admindashboard.component';
import { EmployeedashboardComponent } from './dashboard/employeedashboard/employeedashboard.component';
import { QcdashboardComponent } from './dashboard/qcdashboard/qcdashboard.component';
import { ManagerdashboardComponent } from './dashboard/managerdashboard/managerdashboard.component';
import { DispatchdashboardComponent } from './dashboard/dispatchdashboard/dispatchdashboard.component';
import { ViewquotationComponent } from './views/viewquotation/viewquotation.component';
import { ViewrequirementComponent } from './views/viewrequirement/viewrequirement.component';
import { ViewbillComponent } from './views/viewbill/viewbill.component';
import { ViewworkorderComponent } from './views/viewworkorder/viewworkorder.component';
import { ViewchallanComponent } from './views/viewchallan/viewchallan.component';
import { ViewpurchaseorderComponent } from './views/viewpurchaseorder/viewpurchaseorder.component';
import { BillComponent } from './pages/bill/bill.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { MachineComponent } from './pages/machine/machine.component';
import { MaterialComponent } from './pages/material/material.component';
import { PurchaseorderComponent } from './pages/purchaseorder/purchaseorder.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { RequirementComponent } from './pages/requirement/requirement.component';
import { QuotationComponent } from './pages/quotation/quotation.component';
import { WorkorderComponent } from './pages/workorder/workorder.component';
import { WorkordercloseComponent } from './pages/workorderclose/workorderclose.component';
import { ChallanComponent } from './pages/challan/challan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItemrequirementComponent } from './pages/itemrequirement/itemrequirement.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DashboardnavbarComponent,
    EmployeedetailsComponent,
    LoginComponent,
    DispatchmanagerworkorderComponent,
    EngineerworkorderComponent,
    QcworkorderComponent,
    ManagerworkorderComponent,
    AccountantdashboardComponent,
    AdmindashboardComponent,
    EmployeedashboardComponent,
    QcdashboardComponent,
    ManagerdashboardComponent,
    DispatchdashboardComponent,
    ViewquotationComponent,
    ViewrequirementComponent,
    ViewbillComponent,
    ViewworkorderComponent,
    ViewchallanComponent,
    ViewpurchaseorderComponent,
    BillComponent,
    ClientsComponent,
    DashboardComponent,
    HomeComponent,
    MachineComponent,
    MaterialComponent,
    PurchaseorderComponent,
    EmployeeComponent,
    RequirementComponent,
    QuotationComponent,
    WorkorderComponent,
    WorkordercloseComponent,
    ChallanComponent,
    ItemrequirementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
