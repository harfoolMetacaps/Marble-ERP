import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class PaymentOutService {
  constructor(private http: HttpClient) { }


  createPayment(data: {} | null) {
    return this.http.post(environment.apiUrl + "/Sales/createPayment", data);
  }

  getPaymentById(id: string) {
    return this.http.get(environment.apiUrl + "/Sales/getPaymentDetailById/" + id);
  }


  getPaymentList() {
    return this.http.get(environment.apiUrl + "/Purchase/getPaymentList");
  }

  getSalesByCustomerId(id: any) {
    return this.http.get(environment.apiUrl + "/Sales/getSalesByCustomerId/" + id)
  }
  
  deletePaymentById(id: any) {
    return this.http.delete(environment.apiUrl + "/Sales/deletePayment/" + id)
  }
  
  
  getPaymentDetailById(id: any) {
    return this.http.get(environment.apiUrl + "/Sales/getPaymentDetailById/" + id)
  }
}