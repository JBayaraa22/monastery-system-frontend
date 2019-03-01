import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { makeToast } from 'src/app/shared/functions';
import { Receipt } from 'src/app/models/receipt';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ReceiptService } from 'src/app/services/receipt.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  search = {} as Book
  currentUser : User
  receipt = {} as Receipt
  follow = {} as Book
  yrool = {} as Book
  books : Array<Book>
  special : Array<Book>
  yroolType : string
  totalPrice : number 
  searchResult : Array<Book>

  year : string
  years_ref : string
  gender : string

  constructor(private bookService : BookService , private receiptService : ReceiptService) {
    
    this.receipt.books = []
    this.receipt.from = ""
    this.receipt.toWhom = ""
    this.receipt.printedDate = new Date()
   
   
    setInterval(() => {
      this.receipt.printedDate = new Date();
    }, 1);
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))    
    this.receipt.printedBy = this.currentUser.username
    this.follow.name = " Маанийн ерөөл "
    this.follow.price = 0
    this.follow.description = ""
    this.follow.id = null
    
    
    this.yrool.name = "Хурал даган баясах"
    if(this.yroolType)
      this.yrool.name += `(${this.yroolType})`

    this.yrool.price = 0
    this.yrool.id =  null
    this.yrool.description = ""
    this.getData()
    this.calculateTotal()
   
    
  }

  changeType(){
    this.yrool.name = "Хурал даган баясах"
    if(this.yroolType)
      this.yrool.name += `(${this.yroolType})`
  }
  calculateTotal(){
    this.totalPrice = this.receipt.books.reduce((total , book) => +total + +book.price , 0)
  }
  addToReceipt(book){
    this.receipt.books.push(book)
    this.calculateTotal()
  }
  removeFromReceipt(book){
    this.receipt.books.splice(this.receipt.books.indexOf(book) , 1)
    this.calculateTotal()
  }
  getData(){
    this.bookService.getAll().subscribe(data=>{
      this.books = data.filter(object=> object.type == 1 )
      this.special = data.filter(object=> object.type == 2 )
    });
  }
  searchBookByName(value , type){
    let tmp_array : Array<Book>
    tmp_array = type == 1 ? this.books : this.special
    
    if(value!="")
      this.searchResult = tmp_array.filter(book=> book.name.toLowerCase().includes(value.toLowerCase()))
    else
      this.searchResult = []
  }
  print(){
    if(this.receipt.books.length > 0)
    {
      window.print()
      this.receiptService.insertReceipt(this.receipt).subscribe((response) => {
        makeToast(response.message , response.title)
      })
      makeToast("Баримтыг үнэн зөв хэвлэсэн эсэхийг шалгана уу ? " , 'warning')
    }
    else
      makeToast("Баримт хоосон байна" , 'error')
  }

  checkAmount(value , type){
    if(value < 0){
      if(type==1)
        this.receipt.books.splice(this.receipt.books.indexOf(this.follow))
      else
        this.receipt.books.splice(this.receipt.books.indexOf(this.yrool))
    }
    else{
      if(type==1)
      {
        if(this.receipt.books.indexOf(this.follow)==-1)
          this.receipt.books.push(this.follow)
      }
        
      else
        if(this.receipt.books.indexOf(this.yrool)==-1)
          this.receipt.books.push(this.yrool)
    }
    this.calculateTotal()
  }
  addYears(){
    if(this.year == "" || this.years_ref == "" || this.gender == "")
      makeToast("Бүх талбаруудыг бөглөнө үү." , 'error')
    else{
      let id = this.year + this.years_ref + this.gender
      this.bookService.getYear(id).subscribe(data=>{
        if(data.response.code == 200){
          data.data.books.forEach(book => {
            this.receipt.books.push(book)
          });
        }
        else{
          makeToast(data.response.message , data.response.title)
        }
      })
    }
  }
}
