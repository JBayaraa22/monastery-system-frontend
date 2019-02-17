import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

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
    this.currentUser = new User(JSON.parse(localStorage.getItem('currentUser')))
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
