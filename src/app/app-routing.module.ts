import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkordercloseComponent } from './pages/workorderclose/workorderclose.component';
import { ViewworkorderComponent } from './views/viewworkorder/viewworkorder.component';
import { DispatchmanagerworkorderComponent } from './workorders/dispatchmanagerworkorder/dispatchmanagerworkorder.component';
import { DispatchdashboardComponent } from './dashboard/dispatchdashboard/dispatchdashboard.component';
import { PurchaseorderComponent } from './pages/purchaseorder/purchaseorder.component';
import { ManagerworkorderComponent } from './workorders/managerworkorder/managerworkorder.component';
import { QuotationComponent } from './pages/quotation/quotation.component';
import { ViewchallanComponent } from './views/viewchallan/viewchallan.component';
import { ChallanComponent } from './pages/challan/challan.component';
import { MachineComponent } from './pages/machine/machine.component';
import { MaterialComponent } from './pages/material/material.component';
import { ManagerdashboardComponent } from './dashboard/managerdashboard/managerdashboard.component';
import { ViewbillComponent } from './views/viewbill/viewbill.component';
import { BillComponent } from './pages/bill/bill.component';
import { WorkorderComponent } from './pages/workorder/workorder.component';
import { RequirementComponent } from './pages/requirement/requirement.component';
import { AccountantdashboardComponent } from './dashboard/accountantdashboard/accountantdashboard.component';
import { QcworkorderComponent } from './workorders/qcworkorder/qcworkorder.component';
import { QcdashboardComponent } from './dashboard/qcdashboard/qcdashboard.component';
import { EngineerworkorderComponent } from './workorders/engineerworkorder/engineerworkorder.component';
import { EmployeedashboardComponent } from './dashboard/employeedashboard/employeedashboard.component';
import { ViewpurchaseorderComponent } from './views/viewpurchaseorder/viewpurchaseorder.component';
import { ViewquotationComponent } from './views/viewquotation/viewquotation.component';
import { ViewrequirementComponent } from './views/viewrequirement/viewrequirement.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AdmindashboardComponent } from './dashboard/admindashboard/admindashboard.component';
import { LoginComponent } from './common/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [

  { path: '', component: DashboardComponent},
  { path: 'login', component: LoginComponent },
  {
    path: 'AdminDashboard', component: AdmindashboardComponent, title: 'Admin Dashboard', children: [
      { path: '', redirectTo: 'Requirement', pathMatch: 'full' },
      { path: 'Client', component: ClientsComponent },
      { path: 'Employee', component: EmployeeComponent },
      { path: 'Machine', component: MachineComponent },
      { path: 'Material', component: MaterialComponent },
      { path: 'DeliveryChallan', component: ChallanComponent },
      { path: 'Quotation', component: QuotationComponent },
      { path: 'WorkOrder', component: WorkorderComponent },
      { path: 'Bill', component: BillComponent },
      { path: 'WorkOrderClose', component: WorkordercloseComponent },
      { path: 'PurchaseOrder', component: PurchaseorderComponent },
      { path: 'Requirement', component: RequirementComponent },
      { path: 'RequirementDetails/:Req_id', component: ViewrequirementComponent },
      { path: 'QuotationDetails/:Quotation_Id', component: ViewquotationComponent },
      { path: 'PurchaseOrderDetails/:Id', component: ViewpurchaseorderComponent },
      { path: 'WorkorderDetails/:Workorder_Id', component: ViewworkorderComponent },
      { path: 'BillDetails/:Bill_Id', component: ViewbillComponent },
      { path: 'ChallanDetails/:Challan_id', component: ViewchallanComponent },
      { path: '**', redirectTo: 'AdminDashboard' }
    ]
  },
  {
    path: 'EmployeeDashboard', component: EmployeedashboardComponent, title: 'Employee Dashboard', children: [
      { path: '', redirectTo: 'WorkOrder', pathMatch: 'full' },
      { path: 'WorkOrder', component: EngineerworkorderComponent },
      { path: 'WorkorderDetails/:Workorder_Id', component: ViewworkorderComponent },
      { path: 'WorkOrderClose', component: WorkordercloseComponent },
      { path: '**', redirectTo: 'EmployeeDashboard' }
    ]
  },
  {
    path: 'QCDashboard', component: QcdashboardComponent, title: 'QC Dashboard', children: [
      { path: '', redirectTo: 'WorkOrder', pathMatch: 'full' },
      { path: 'WorkOrder', component: QcworkorderComponent },
      { path: 'WorkorderDetails/:Workorder_Id', component: ViewworkorderComponent },
      { path: 'WorkOrderClose', component: WorkordercloseComponent },
      { path: '**', redirectTo: 'QCDashboard' }
    ]
  },
  {
    path: 'AccountantDashboard', component: AccountantdashboardComponent, title: 'Accountant Dashboard', children: [
      { path: '', redirectTo: 'WorkOrder', pathMatch: 'full' },
      { path: 'Requirement', component: RequirementComponent },
      { path: 'Machine', component: MachineComponent },
      { path: 'Material', component: MaterialComponent },
      { path: 'DeliveryChallan', component: ChallanComponent },
      { path: 'ChallanDetails/:Challan_id', component: ViewchallanComponent },
      { path: 'Quotation', component: QuotationComponent },
      { path: 'WorkOrder', component: WorkorderComponent },
      { path: 'Bill', component: BillComponent },
      { path: 'BillDetails/:Bill_Id', component: ViewbillComponent },
      { path: 'WorkOrderClose', component: WorkordercloseComponent },
      { path: 'PurchaseOrder', component: PurchaseorderComponent },
      { path: '**', redirectTo: 'AccountantDashboard' }
    ]
  },
  {
    path: 'ManagerDashboard', component: ManagerdashboardComponent, title: 'Manager Dashboard', children: [
      { path: '', redirectTo: 'WorkOrder', pathMatch: 'full' },
      { path: 'Machine', component: MachineComponent },
      { path: 'Material', component: MaterialComponent },
      { path: 'DeliveryChallan', component: ChallanComponent },
      { path: 'ChallanDetails/:Challan_id', component: ViewchallanComponent },
      { path: 'Quotation', component: QuotationComponent },
      { path: 'WorkOrder', component: ManagerworkorderComponent },
      { path: 'WorkorderDetails/:Workorder_Id', component: ViewworkorderComponent },
      { path: 'WorkOrderClose', component: WorkordercloseComponent },
      { path: 'PurchaseOrder', component: PurchaseorderComponent },
      { path: '**', redirectTo: 'ManagerDashboard' }
    ]
  },
  {
    path: 'DispatchDashboard', component: DispatchdashboardComponent, title: 'Dispatch Department Dashboard', children: [
      { path: '', redirectTo: 'WorkOrder', pathMatch: 'full' },
      { path: 'WorkOrder', component: DispatchmanagerworkorderComponent },
      { path: 'WorkorderDetails/:Workorder_Id', component: ViewworkorderComponent },
      { path: 'WorkOrderClose', component: WorkordercloseComponent },
      { path: '**', redirectTo: 'DispatchDashboard' }
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
