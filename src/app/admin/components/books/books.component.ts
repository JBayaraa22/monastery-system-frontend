import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { BookService } from 'src/app/services/book.service';
import { makeToast } from 'src/app/shared/functions';
import { map , filter} from 'rxjs/operators'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  currentUser : User
  addBookForm  : FormGroup
  selectedBook : Book
  books : Array<Book>
  special : Array<Book>
  constructor(private bookService : BookService) { 
    this.currentUser = new User(JSON.parse(localStorage.getItem('currentUser')))
    this.addBookForm = new FormGroup({
      id : new FormControl(0) ,
      name : new FormControl(""),
      description : new FormControl(""),
      price :  new FormControl(0),
      created_by : new FormControl(this.currentUser.username),
      type : new FormControl('')
    })

    this.selectedBook = {
      id : 1,
      name : "",
      description : "",
      type : 1,
      created_by : this.currentUser.username,
      price : 0

    }
  }

  ngOnInit() {
    this.getData()
    
  }
  getData(){
    let tmpBooks = this.bookService.getAll().subscribe(data=>{
      this.books = data.filter(object=> object.type == 1 )
      this.special = data.filter(object=> object.type == 2 )
    });
  }
  deleteBook(book){
    Swal.fire({
      title: `<b>${book.name}</b>-г устгах уу?`,
      text: "Энэ үйлдлийг буцаах боломжгүй!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Тийм, устга!',
      cancelButtonText : "Хаах"
    }).then((result) => {
      if (result.value) {
        this.bookService.deleteBook(book.id).subscribe(data=>{
          if(data.response.code == 200){
            makeToast(`${book.name} устлаа` , data.response.title)
            this.getData();
          }
          else {
            makeToast(`${book.name} устгахад алдаа гарлаа, дахин оролдоно уу !` , data.response.title)
          }
        })
        
      }
    })
  }
  onSubmit(){
  
      this.bookService.insertBook(this.addBookForm.value).subscribe(data=>{
        console.log(data)
        makeToast(data.message , data.title)
      })
    
  }
  onUpdate(){
    this.bookService.updateBook(this.selectedBook).subscribe(data=>{
      console.log(data)
      makeToast(data.message , data.title)
    })
  }
}
