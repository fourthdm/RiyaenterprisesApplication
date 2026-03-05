import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  ApiUrl = 'http://localhost:3000';
  // ApiUrl = 'https://ysurveillance.com/Software';

  constructor(private _http: HttpClient, private _State: StateService) { }

  Login(data: any) {
    return this._http.post(this.ApiUrl + '/Adminlogin', data);
  }

  AddAdmin(data: any) {
    return this._http.post(this.ApiUrl + '/AddAdmin', data);
  }

  AllAdmin() {
    return this._http.get(this.ApiUrl + '/AllAdminData');
  }

  UpdateAdmin(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateAdmin/' + data.Id, data);
  }

  DeleteAdmin(Id: any) {
    return this._http.delete(this.ApiUrl + '/DeleteAdmin/' + Id);
  }

  Managerdata() {
    return this._http.get(this.ApiUrl + '/AllManagerData');
  }

  Engineerdata() {
    return this._http.get(this.ApiUrl + '/AllEngineerData');
  }

  DispatchManagerData() {
    return this._http.get(this.ApiUrl + '/AllDispatchManager');
  }

  QCData() {
    return this._http.get(this.ApiUrl + '/AllQCData');
  }
  //AdminAPi Ends

  // Quotation API Start
  AddedQuotation(data: any) {
    return this._http.post(this.ApiUrl + '/Addquotation', data);
  }

  AllQuotation() {
    return this._http.get(this.ApiUrl + '/AllQuotation');
  }

  ByidAllQuotation(Quotation_Id: any) {
    return this._http.get(this.ApiUrl + '/AllquotationbByid/' + Quotation_Id);
  }

  Updatequotation(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateQuotation/' + data.Quotation_Id, data);
  }

  DeleteQuotation(Quotation_Id: number) {
    return this._http.delete(this.ApiUrl + '/DeleteQuotation/' + Quotation_Id);
  }

  GenerateQuotation(Quotation_Id: any) {
    return this._http.get(`${this.ApiUrl}/GetQuotationPDF/${Quotation_Id}`, {
      responseType: 'blob'
    });
  }
  // Quotation API Ends

  //Bill API Start
  AddBill(data: any) {
    return this._http.post(this.ApiUrl + '/AddBill', data);
  }

  UpdateBills(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateBill/' + data.Bill_Id, data);
  }

  GenerateBill(Bill_Id: any) {
    return this._http.get(`${this.ApiUrl}/GetBillPDF/${Bill_Id}`, {
      responseType: 'blob'
    });
  }

  AllBill() {
    return this._http.get(this.ApiUrl + '/AllBills');
  }

  AllBillbyid(Bill_Id: any) {
    return this._http.get(this.ApiUrl + '/AllBillbyId/' + Bill_Id);
  }

  DeleteBill(Bill_Id: any) {
    return this._http.delete(this.ApiUrl + '/DeleteBill/' + Bill_Id);
  }

  //Bill API End

  //All Purchase Order Data
  AllPurchaseOrder() {
    return this._http.get(this.ApiUrl + '/AllPurchaseOrder');
  }

  AddPurchaseOrder(data: any) {
    return this._http.post(this.ApiUrl + '/AddPurchaseOrder', data);
  }

  Purchaseorderbyid(Id: any) {
    return this._http.get(this.ApiUrl + '/PurchaseOrderbyid/' + Id);
  }

  EditPurchaseOrder(data: any) {
    return this._http.put(this.ApiUrl + '/UpdatePurchaseOrder/' + data.Id, data);
  }

  DeletePurchaseOrder(Id: number) {
    return this._http.delete(this.ApiUrl + '/DeletePurchaseOrder/' + Id);
  }

  GeneratePurchaseOrder(Id: any) {
    return this._http.get(`${this.ApiUrl}/GetPurchaseOrderPDF/${Id}`, {
      responseType: 'blob'
    });
  }
  //AllPurchase Order Api Ends

  //AllREquirement Data
  AllRequirement() {
    return this._http.get(this.ApiUrl + '/AllRequirement');
  }

  createRequirement(formdata: FormData) {
    return this._http.post(this.ApiUrl + '/requirement', formdata);  //Multiple Product are added  in one requirement_id
  }

  Allrequirementss() {
    // return this._http.get(this.ApiUrl + '/requirementsAll');
    return this._http.get(this.ApiUrl + '/GetRequirements');
  }

  addRequirement(data: any) {
    return this._http.post(`${this.ApiUrl}/AddRequirementitemS`, data);
  }

  getRequirementById(Req_id: number) {
    return this._http.get(`${this.ApiUrl}/GetRequirement/${Req_id}`);
  }

  // AddRequirement(formData: any) {
  //   return this._http.post(this.ApiUrl + '/AddRequirement', formData);
  // }

  AddRequirement(formData: FormData) {
    return this._http.post(this.ApiUrl + '/AddRequirementswithmultipleproduct', formData);
    // return this._http.post(this.ApiUrl + '/AddRequirementItems', formData);
  }

  Requirementdetails(Req_id: number) {
    return this._http.get(this.ApiUrl + '/DatabyidrequirementsAll/' + Req_id);
    // return this._http.get(this.ApiUrl + '/Requirementdetails/' + Req_id);
  }

  UpdateRequirementss(Req_id: number, formData: any) {
    return this._http.put(this.ApiUrl + '/UpdateRequirement/' + Req_id, formData);
  }

  DeleteRequirement(Req_id: number) {
    return this._http.delete(this.ApiUrl + '/DeleteREquirement/' + Req_id);
  }

  //Machine Api Start
  AddMachine(data: any) {
    return this._http.post(this.ApiUrl + '/AddMachine', data);
  }

  AllMachine() {
    return this._http.get(this.ApiUrl + '/AllMachines');
  }

  UpdateMachine(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateMachine/' + data.Machine_id, data);
  }

  DeleteMachine(Machine_id: any) {
    return this._http.delete(this.ApiUrl + '/DeleteMachine/' + Machine_id);
  }

  MachineById(Machine_id: any) {
    return this._http.get(this.ApiUrl + '/GetMachine/' + Machine_id);
  }

  AvailbleMachine() {
    return this._http.get(this.ApiUrl + '/AvailableMachines');
  }
  //Machine Api End

  //Material API Start

  AddMAterialS(data: any) {
    return this._http.post(this.ApiUrl + '/AddMaterial', data);
  }

  UpdateMaterial(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateMaterial/' + data.Material_id, data);
  }

  AllMaterials() {
    return this._http.get(this.ApiUrl + '/ALLMaterial');
  }

  AllMaterialTypes() {
    return this._http.get(this.ApiUrl + '/Materialbygroup');
  }

  MaterialByid(Material_id: any) {
    return this._http.get(this.ApiUrl + '/MaterialbyId/' + Material_id);
  }

  MaterialByWeights(data: any) {
    return this._http.post(this.ApiUrl + '/MaterialByWeight', data);
  }

  MaterialByName(data: any) {
    return this._http.post(this.ApiUrl + '/MaterialbyMaterialName', data);
  }

  MaterialBySize(data: any) {
    return this._http.post(this.ApiUrl + '/MaterialByMaterialsize', data);
  }

  MaterialByType(data: any) {
    return this._http.post(this.ApiUrl + '/MaterialByMaterialtype', data);
  }

  DeleteMaterial(Material_id: number) {
    return this._http.delete(this.ApiUrl + '/DeleteMaterial/' + Material_id);
  }
  // Material API Ends

  //Work Order API Start
  AddWorkOrder(data: any) {
    return this._http.post(this.ApiUrl + '/AddWorkorder', data);
  }

  AllWorkOrder() {
    return this._http.get(this.ApiUrl + '/AllWorkOrder');
  }

  WorkorderbyID(Workorder_Id: any) {
    return this._http.get(this.ApiUrl + '/WorkOrderbyid/' + Workorder_Id);
  }

  Allworkorderbyid(Workorder_Id: number) {
    return this._http.get(this.ApiUrl + '/WorkOrderbyid/' + Workorder_Id);
  }

  UpdateWorkorder(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateWorkOrder/' + data.Workorder_Id, data);
  }

  UpdateWorkorderbymanager(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateMangerStatus/' + data.Workorder_Id, data);
  }

  DeleteWorkorder(Workorder_Id: number) {
    return this._http.delete(this.ApiUrl + '/DeleteWorkOrder/' + Workorder_Id);
  }

  UpdateEngineeerstatus(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateEngineerStatus/' + data.Workorder_Id, data);
  }

  UpdateQcStatus(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateQCStatus/' + data.Workorder_Id, data);
  }

  UpdateDispatchManagerStatus(data: any) {
    return this._http.put(this.ApiUrl + '/UpateDispatchmangerstatus/' + data.Workorder_Id, data);
  }

  WorkorderforManager() {
    this._State.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._State.token });
    return this._http.get(this.ApiUrl + '/WOrkOrderformanager', { headers });
  }

  WorkorderforEngineer() {
    this._State.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._State.token });
    return this._http.get(this.ApiUrl + '/WORKordersForEngineer', { headers });
  }

  WorkorderforQC() {
    this._State.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._State.token });
    return this._http.get(this.ApiUrl + '/WorkOrderForQC', { headers });
  }

  Workorderfordispatchmanager() {
    this._State.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._State.token });
    return this._http.get(this.ApiUrl + '/WorkorderforDispatchmanager', { headers });
  }

  WorkorderbyStatus(data: any) {
    return this._http.post(this.ApiUrl + '/GetWorkorderbyStatus', data);
  }

  getWorkorderStatusByPO(po: string) {
    return this._http.get<any>(`${this.ApiUrl}/WorkorderStatusByPO/${po}`);
  }

  // WorkorderbyPurchaseNumber(data: any) {
  //   return this._http.post(this.ApiUrl + '/WorkorderStatusByPO', data);
  // }

  //Work Order API Ends

  //WorkorderClose API Start
  AddWorkorderclose(data: any) {
    return this._http.post(this.ApiUrl + '/AddWorkorderClose', data);
  }

  Updateworkorderclose(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateWorkorderClose/' + data.WorkClose_Id, data);
  }

  Allworkorderclose() {
    return this._http.get(this.ApiUrl + '/AllWorkorderClose');
  }

  AllUpdateWorkOrderClosebyid(WorkClose_Id: any) {
    return this._http.get(this.ApiUrl + '/Allworkorderclose/' + WorkClose_Id);
  }

  DeleteWorkorderClose(WorkClose_Id: any) {
    return this._http.delete(this.ApiUrl + '/DeleteWorkorderclose/' + WorkClose_Id);
  }
  //WorkorderClose API Ends 

  //Notification 
  getNotifications(role: string) {
    return this._http.get<any[]>(`${this.ApiUrl}/notifications/${role}`);
  }

  markAsRead(id: number) {
    return this._http.put(`${this.ApiUrl}/notifications/read/${id}`, {});
  }

  createNotification(Workorder_Id: number) {
    return this._http.post(
      `${this.ApiUrl}/notifications/create`, { Workorder_Id }
    );
  }

  //All Challan Start
  AddChallans(data: any) {
    return this._http.post(this.ApiUrl + '/AddChallan', data);
  }

  ChallanData() {
    return this._http.get(this.ApiUrl + '/AllChallans');
  }

  GenerateChallan(Challan_id: any) {
    return this._http.get(`${this.ApiUrl}/GetChallanPDF/${Challan_id}`, {
      responseType: 'blob'
    });
  }

  ChallanbyId(Challan_id: any) {
    return this._http.get(this.ApiUrl + '/ChallanbyID/' + Challan_id);
  }

  getBillStatusByPO(po: string) {
    return this._http.get<any>(`${this.ApiUrl}/BillstatusbyPO/${po}`);
  }

  UpdateChallan(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateChallan/' + data.Challan_id, data);
  }

  DeleteChallan(Challan_id: any) {
    return this._http.delete(this.ApiUrl + '/DeleteChallan/' + Challan_id);
  }
  //All Challan End

  //All Client API Start
  AddClients(data: any) {
    return this._http.post(this.ApiUrl + '/AddClientdata', data);
  }

  AllClients() {
    return this._http.get(this.ApiUrl + '/AllClients');
  }

  UpdateClient(data: any) {
    return this._http.put(this.ApiUrl + '/Updateclient/' + data.Client_id, data);
  }

  DeleteClient(Client_id: any) {
    return this._http.delete(this.ApiUrl + '/DeleteClient/' + Client_id);
  }

  Clientdatabyid(Client_id: any) {
    return this._http.get(this.ApiUrl + '/DatabyClientid/' + Client_id);
  }
  //All Client API End

  AllQuotationsnew() {
    return this._http.get(this.ApiUrl + '/GetQuotations');
  }

  QuotationByid(Quotation_Id: any) {
    return this._http.get(this.ApiUrl + '/GetQuotationbyid/' + Quotation_Id);
  }

  // Purchase Order 
  AddedPurchaseOrder(data: any) {
    return this._http.post(this.ApiUrl + '/AddPurchaseOrder', data);
  }

  AllPurchase() {
    return this._http.get(this.ApiUrl + '/AllPurchaseOrders');
  }

  ByidAllPurchaseOrder(Purchase_id: any) {
    return this._http.get(this.ApiUrl + '/PurchaseOrdersbyid/' + Purchase_id);
  }

}

