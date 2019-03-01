import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  currentUser : User
  headers = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'})
  requestOptions = { headers : this.headers }
  constructor(private http : HttpClient) { }

  insertReceipt(data){
    return this.http.post<any>(`${environment.apiBase}receipt/?insert` , data , this.requestOptions).pipe(
      map((data)=>{
        return data.response
      })
    )
  }

  getReceipt(username){
    return this.http.post<any>(`${environment.apiBase}receipt/?getByUser` , {username  : username} , this.requestOptions).pipe(
      map((data)=>{
        return data
      })
    )
  }

  getRecent(){
    return this.http.get<any>(`${environment.apiBase}receipt/?getRecent`).pipe(
      map((data)=>{
        return data
      })
    )
  }
  getSpecificDate(printed_date){
    return this.http.post<any>(`${environment.apiBase}receipt/?getSpecificDate` , {printed_date : printed_date } , this.requestOptions).pipe(
      map((data)=>{
        return data
      })
    )
  }

  filteredData(filters){
    return this.http.post<any>(`${environment.apiBase}receipt/?filtered` , { filters : filters} , this.requestOptions).pipe(
      map((data)=>{
        return data.data
      })
    )
  }

  changeReceiptStatus(receipt){
    return this.http.post<any>(`${environment.apiBase}receipt/?changeStatus` , {receipt : receipt} ,this.requestOptions).pipe(
      map((data)=> {
        return data.response
      })
    )
  }

  cashierLastMonth(){
    return this.http.get<any>(`${environment.apiBase}receipt/?cashierLastMonth`).pipe(
      map((data)=> {
        return data
      })
    )
  }

  adminDailyReport(){
    return this.http.get<any>(`${environment.apiBase}receipt/?adminDailyReport`).pipe(
      map((data)=> {
        return data
      })
    )
  }

  booksReport(){
    return this.http.get<any>(`${environment.apiBase}receipt/?booksReport`).pipe(
      map((data)=>{
        return data
      })
    )
  }
}
