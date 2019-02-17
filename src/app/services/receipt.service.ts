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
}
