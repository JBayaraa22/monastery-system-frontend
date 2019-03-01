import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { makeToast } from 'src/app/shared/functions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser : User
  swalWithBootstrapButtons = Swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
  })
  constructor(private authService : AuthService , private router : Router ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(this.currentUser.role == 2)
      this.router.navigate(['/login']);

  }

  ngOnInit() {
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
