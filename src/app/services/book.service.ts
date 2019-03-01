import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { makeToast } from '../shared/functions';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  headers = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'})
  requestOptions = { headers : this.headers }
  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<any>(`${environment.apiBase}book/?getAllBooks`).pipe(
      map((data) => { 
        if(data.response.code == 200){
          return data.data
        }
        return null
      }))
  }

  insertBook(data){
    return this.http.post<any>(`${environment.apiBase}book/?insert` , data , this.requestOptions).pipe(
      map((data) => {
        return data.response
      })
    )
  }
  updateBook(data){
    return this.http.post<any>(`${environment.apiBase}book/?update` , data , this.requestOptions).pipe(
      map((data) => {
        return data.response
      })
    )
  }

  deleteBook(bookId){
    return this.http.post<any>(`${environment.apiBase}book/?delete` , {bookId : bookId} , this.requestOptions).pipe(
      map((data) => {
        return data
      })
    )
  }

  insertYears(data){
    return this.http.post<any>(`${environment.apiBase}years/?insert` , data , this.requestOptions).pipe(
      map((data)=>{
        return data
      })
    )
  }
  getAllYears(){
    return this.http.get<any>(`${environment.apiBase}years/?getAll` ).pipe(
      map((data)=>{
        return data
      })
    )
  }

  deleteYear(id){
    return this.http.post<any>(`${environment.apiBase}years/?delete` , {id : id} , this.requestOptions).pipe(
      map((data)=>{
        return data.response
      })
    )
  }

  getYear(id){
    return this.http.post<any>(`${environment.apiBase}years/?get` , {id : id} , this.requestOptions).pipe(
      map((data)=>{
        return data
      })
    )
  }
}
