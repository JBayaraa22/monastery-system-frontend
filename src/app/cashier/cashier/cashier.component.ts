import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {

  currentUser : User
  constructor(private router : Router , private authService : AuthService) { 
    
  }

  ngOnInit() {
    this.currentUser = new User(localStorage.getItem('currentUser'))
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
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        
        Toast.fire({
          type: 'warning',
          title: 'Системээс гарлаа!'
        })
        this.authService.logout()
        this.router.navigate(['/login']);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ){}
    })
  }
}
