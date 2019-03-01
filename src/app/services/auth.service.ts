import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { Router } from "@angular/router"
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders({
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  })
  requestOptions = { headers :  this.headers }
  constructor(private http: HttpClient, private router: Router) {

  }
  user : User

  login(username: string, password: string) {
    
    let data = {username : username , password : password}
    return this.http.post<any>(`${environment.apiBase}user/?getSingleUser`,  data , this.requestOptions).pipe(
      map((data)=> {     
        this.user = data.response.code == 200 ? data.data : null
        return this.user
    }))
  }


  logout() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return this.http.post<any>(`${environment.apiBase}user/?logout` , {user : currentUser}  ,this.requestOptions).pipe(
      map(data=>{
        if( data.response.code == 200 ){
          localStorage.removeItem('currentUser');
          return true
        }
        return false
      })
    )
   
  }
}
