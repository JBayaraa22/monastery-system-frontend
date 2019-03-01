import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReceiptService } from 'src/app/services/receipt.service';
import { Receipt } from 'src/app/models/receipt';
import { makeToast } from 'src/app/shared/functions'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  today = new Date()
  filterForm : FormGroup
  
  booksReport : {}

  userList : User[]
  recent :  {
    totalIncome : number,
    totalReceipt : number,
    printed_date : Date
  }[]
  cashierRecent :  {
    totalIncome : number,
    totalReceipt : number,
    printed_by : string,
    month : number,
    year : number
  }[]
  receipts : Receipt[]
  count = 0
  
  constructor(private userService : UserService , 
              private receiptService : ReceiptService,
              private fb : FormBuilder  ) {
    
                this.booksReport = {}

    this.filterForm = this.fb.group({
      start_date : ['' , [Validators.required]] ,
      end_date : ['' , [Validators.required]] ,
    })
  }

  ngOnInit() {
    this.getAllCashier()
    this.getRecent()
    this.getCashierRecent()
    this.getBooksReport()
    this.receipts = []
  }

  getBooksReport(){
    this.receiptService.booksReport().subscribe(data=>{
      if(data.response.code == 200)
        this.countBooks(data.data)
      else 
        this.booksReport = {}
    })
  }

  countBooks(array){
    array.forEach(element => {
      let tmp = element.books.split(",");
      tmp.splice(tmp.length-1 , 1)
      tmp.forEach(elm => {
        if(!(elm in this.booksReport))
          this.booksReport[elm] = 1
        else
          this.booksReport[elm]++
      });
    });
  }

  getAllCashier() {
    this.userService.getAllUser().subscribe(data => {
      this.userList = data
    })
  }

  getRecent(){
    this.receiptService.getRecent().subscribe(data=>{
      this.recent = data.data
    })
  }

  getCashierRecent(){
    this.receiptService.cashierLastMonth().subscribe(data=>{
      this.cashierRecent = data.data
    })
  }
  seeReceipts(printed_date){
    this.receiptService.getSpecificDate(printed_date).subscribe(data=>{
      this.receipts = data.data
    })
  }

  countByName(value : string){
    value = value.toLowerCase()
    if(value!==""){
      this.receipts.forEach(receipt => {
        let tmpArray = receipt.book_list.split(",")
        let occurence = tmpArray.filter( data=>{ return data.toLowerCase() == value } )
        this.count += occurence.length
      });
      
    }
    else  this.count = 0

  }
  onSubmit(){
    let data = this.filterForm.value
    if(this.filterForm.valid){
      if(this.compareDates()){
        this.receiptService.filteredData(data).subscribe(data=>{
          this.recent = data
        })
      }
      else{
        makeToast("Эхлэх огноо дуусах огнооноос өмнө байх ёстой " , 'error')
      }
    }
    else{
      makeToast("Талбаруудыг заавал бөглөнө үү! " , 'error')
    }
  }
  compareDates(){
    let startDate = new Date(this.filterForm.get("start_date").value)
    let endDate = new Date(this.filterForm.get("end_date").value)
    if(startDate > endDate)
      return false
    return true
  }

  changeReceiptStatus(receipt){
    this.receiptService.changeReceiptStatus(receipt).subscribe(data=>{
      makeToast(data.message , data.title)

      if(data.code == 200){
        if(receipt.status == 1)
          receipt.status = 2
        else 
          receipt.status = 1
      }
      this.getRecent()
    })
  }


}
