import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Receipt } from 'src/app/models/receipt';
import { ReceiptService } from 'src/app/services/receipt.service';
import { makeToast } from 'src/app/shared/functions';
@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {

  currentUser : User
  receipts : Array<Receipt>
  today = new Date();
  total : number = 0
  returned : number = 0
  constructor(private router : Router , private authService : AuthService , private receiptService : ReceiptService) { 
    
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.getReceipts();
  }

  getReceipts(){
    this.receiptService.getReceipt(this.currentUser.username).subscribe(data=>{
      if(data.response.code==200){
        this.receipts = data.data
        this.total = this.receipts.filter((receipt) => receipt.status == 1).reduce((sum , book)=> +sum + +book.price , 0)    
        this.returned = this.receipts.filter((receipt) => receipt.status == 2).reduce((sum , book)=> +sum + 1 , 0)
      }
    })
  }

  logout(){
    Swal.fire({
      title: '<strong>Анхаар!</u></strong>',
      type: 'info',
      html:
        'Та системээс гарахдаа итгэлтэй байна уу ?',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Тийм",
      cancelButtonText:
        'Үгүй, хаах'
    }).then( (result) => {
      if (result.value) {
        this.authService.logout().subscribe(isLoggedOut=>{
          if(isLoggedOut)
          {
            this.router.navigate(['/login']);
            makeToast("Системээс гарлаа !" , 'warning' )
          }
          else 
            makeToast("Алдаа гарлаа дахин оролдоно уу !" , 'error' )
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ){}
    })
  }
}
