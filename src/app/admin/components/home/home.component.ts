import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ReceiptService } from 'src/app/services/receipt.service';
import { Receipt } from 'src/app/models/receipt';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  receipts : Array<Receipt>
  today = new Date();
  total : number = 0
  returned : number = 0
  activeUsers : User[]
  returnedPercent : number = 0
  constructor(private userService : UserService , private receiptService : ReceiptService) {
    
  }

  ngOnInit() {
    this.getActiveUsers()
    this.receiptService.adminDailyReport().subscribe(data=>{
      if(data.response.code==200){
        this.receipts = data.data
        this.total = this.receipts.filter((receipt) => receipt.status == 1).reduce((sum , book)=> +sum + +book.price , 0)    
        this.returned = this.receipts.filter((receipt) => receipt.status == 2).reduce((sum , book)=> +sum + 1 , 0)

        this.returnedPercent = Math.floor((this.returned / this.receipts.length) * 100)
      }
     }
    )
  }
  getActiveUsers(){
    this.userService.getActiveCashier().subscribe(data=>{
      this.activeUsers = data
    })
  }
}
