import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import Swal from 'sweetalert2'


import { makeToast } from 'src/app/shared/functions'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  selectedUser: User
  userList: Array<User>
  addUserForm: FormGroup
  constructor(private userService: UserService) {
    this.addUserForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_repeat: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

    this.selectedUser = {
      username: "",
      role: 0,
    }
  }

  ngOnInit() {
    this.getAllCashier();
  }
  onSubmit() {
    if (this.addUserForm.valid) {
      if (this.addUserForm.get("password").value == this.addUserForm.get("password_repeat").value) {
        this.userService.insertUser(this.addUserForm.value).subscribe(response => {
          makeToast(response.message, response.title)
          if(response.code == 200)
            this.reloadPage()
        })
      }
      else {
        makeToast("Нууц үгээ зөв давтаж оруулна уу!", 'warning')
      }
    }
    else{
      makeToast("Хэрэглэгчийн нэр 4 өөс дээш урттай , нууц үг 8 аас дээш урттай байна.", 'warning')
    }
  }
  getAllCashier() {
    this.userService.getAllUser().subscribe(data => {
      this.userList = data
    })
  }

  deleteUser(){
    Swal.fire({
      title: '<b>'+this.selectedUser.username+'</b>нэртэй хэрэглэгчийг устгах уу?',
      text: "Энэ үйлдлийг буцаах боломжгүй!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText : "Хаах",
      confirmButtonText: 'Тийм , устга!'
    }).then((result) => {
      if (result.value) {
        let username = this.selectedUser.username
        this.userService.deleteUser(username).subscribe(response=>{
          makeToast(response.message , response.title);
          if(response.code == 200)
            this.reloadPage()
        })
      }
    })
    
  }
  updateUser(){
    if(this.selectedUser.password.length >= 8 && this.selectedUser.password_repeat.length > 0){
      if(this.selectedUser.password == this.selectedUser.password_repeat){
        this.userService.updateUser(this.selectedUser).subscribe(response=>{
          
          makeToast(response.message , response.title);
          if(response.code == 200)
            this.reloadPage()
        })
      }
      else{
        makeToast("Нууц үгээ зөв давтаж хйинэ үү.", 'warning')
      }
    }
    else{
      makeToast("Нууц үг 8 аас дээш урттай байна.", 'warning')
    }
  }
  reloadPage() {
    setTimeout(() => { location.reload() }, 1000)
  }
}
