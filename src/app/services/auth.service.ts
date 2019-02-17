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

  constructor(private http: HttpClient, private router: Router) {

  }
  user : User

  login(username: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    })
    let data = {username : username , password : password}
    console.log("Data ", data)
    return this.http.post<any>(`${environment.apiBase}user/?getSingleUser`,  data , {headers : headers}).pipe(
      map((data)=> {     
      if(data.response.code == 200){
        this.user = new User(data.data)
        localStorage.setItem('currentUser' , JSON.stringify(this.user))
      }
      else 
      this.user = null;
      return this.user
    }))
  }


  logout() {
    localStorage.removeItem('currentUser');
  }
}
