import { Component, OnInit } from '@angular/core';
import { Receipt } from 'src/app/models/receipt';
import { ReceiptService } from 'src/app/services/receipt.service';
import { User } from 'src/app/models/user';
import { makeToast } from 'src/app/shared/functions';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  receipts : Array<Receipt>
  currentUser : User
  today = new Date();
  total : number = 0
  returned : number = 0
  constructor(private receiptService : ReceiptService) {
    this.currentUser =JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getReceipts();
  }
  getReceipts(){
    this.receiptService.getReceipt(this.currentUser.username).subscribe(data=>{
      if(data.response.code==200){
        this.receipts = data.data
        this.total = this.receipts.filter((receipt) => receipt.status == 1).reduce((sum , book)=> +sum + +book.price , 0)    
        this.returned = this.receipts.filter((receipt) => receipt.status == 2).reduce((sum , book)=> +sum + 1 , 0)
      }
      else 
        makeToast(data.response.code , data.response.title)
    })
  }
}
