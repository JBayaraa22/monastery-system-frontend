import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { makeToast } from '../shared/functions';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'})
  requestOptions = { headers : this.headers }
  constructor(private http : HttpClient) { }

  insertUser(data){
    return this.http.post<any>(`${environment.apiBase}user/?insert` , data , this.requestOptions).pipe(
      map((data)=>{
        return data.response
      })
    )
  }

  getAllUser(){
    return this.http.get<any>(`${environment.apiBase}user/?getAllCashier`).pipe(
      map(data=>{
        return data.response.code == 200 ? data.data : null
      })
    )
  }

  deleteUser(username){
    return this.http.post<any>(`${environment.apiBase}user/?delete` , {username : username} , this.requestOptions).pipe(
      map((data)=>{
        return data.response
      })
    )
  }

  updateUser(user){
    return this.http.post<any>(`${environment.apiBase}user/?update` , user , this.requestOptions).pipe(
      map((data)=>{
        return data.response
      })
    )
  }

  getActiveCashier(){
    return this.http.get<any>(`${environment.apiBase}user/?getActiveCashier`).pipe(
      map(data=>{
        return data.response.code == 200 ? data.data : null
      })
    )
  }
  
}
