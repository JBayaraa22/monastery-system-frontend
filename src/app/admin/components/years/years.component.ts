import { Component, OnInit } from '@angular/core';
import { Receipt } from 'src/app/models/receipt';
import { ReceiptService } from 'src/app/services/receipt.service';
import { FormArray , FormGroup , FormControl, FormBuilder, Validators } from '@angular/forms'
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
import Swal from 'sweetalert2';
import { makeToast } from 'src/app/shared/functions';
@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.css']
})
export class YearsComponent implements OnInit {

  textEdit = "Жилийн засал Засах"
  textAdd = "Жилийн засал нэмэх"
  yearForm : FormGroup
  title : string = this.textAdd
  buttonText : string = this.textAdd

  searchResult : Book[]
  books : Book[]

  yearsList : {
    id : number,
    year : number ,
    gender : number ,
    years_ref : number,
    books : string,
    description : string 
  }[]
  constructor(private receiptService : ReceiptService , private fb : FormBuilder , private bookService : BookService) { }

  ngOnInit() {
    this.yearsList = []
    this.yearForm = this.fb.group({
      year : ['1950' , [Validators.required]],
      years_ref : ['1' , [Validators.required]],
      description : '',
      gender : ['1' , [Validators.required]],
      books : this.fb.array([]) 

    })

    this.bookService.getAll().subscribe(data=>{
      this.books = data
    })
    this.bookService.getAllYears().subscribe(data=>{
      let tmp;
      if(data.response.code == 200)
        tmp = data.data
      else 
        tmp = []
      this.initYearsList(tmp)

    })
  }

  initYearsList(array){

    let tmp : {
      id : number,
      year : number ,
      gender : number ,
      years_ref : number,
      books : string,
      description : string 
    }[]

    array.forEach(element => {
      let id = element.id
      let year = id.substring(0 , 4)
      let gender = id.substring(id.length - 1)
      let years_ref = id.substring(4 , 5 + (id.length - 6))

      let books = ""

      element.books.forEach(book => {
        books = books + book.name + ","
      });



      let tmp = {
        id : id,
        year : year , 
        years_ref : years_ref,
        gender : gender,
        description : element.description,
        books : books
      }

      this.yearsList.push(tmp)


    });
  }

  get bookForms(){
    return this.yearForm.get("books") as FormArray
  }

  searchBook(value){
    let tmp = value.replace(/ /g, '')
    if(tmp.length > 0)
    {
      this.searchResult = this.books.filter(element=>{
        return element.name.includes(value)
      })
    }
    else this.searchResult = []
  }

  addBook(obj){
    const book = this.fb.group({
      id : obj.id,
      name : obj.name,
      description : obj.description,
      price : obj.price,
    })
    this.bookForms.push(book);
  }

  deleteBook(index){
    this.bookForms.removeAt(index)
  }

  removeYear(index , id){
    Swal.fire({
      title: `Устгах уу?`,
      text: "Энэ үйлдлийг буцаах боломжгүй!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Тийм, устга!',
      cancelButtonText: "Хаах"
    }).then((result) => {
      if (result.value) {
        this.bookService.deleteYear(id).subscribe(data=>{
          if(data.code == 200)
            this.yearsList.splice(index , 1)
          makeToast(data.message, data.title)
        })
      }
    })
    
  }
  onSubmit(){
    if(this.yearForm.valid){
      this.bookService.insertYears(this.yearForm.value).subscribe(data=>{
        makeToast(data.response.message , data.response.title )
        if(data.response.code == 200)
          this.reloadPage()
      })
    }
    else{
      makeToast('Заавал бөглөх талбаруудыг бөглөнө үү .' , 'error')
    }
  }
  reloadPage() {
    setTimeout(() => { location.reload() }, 1000)
  }

}
