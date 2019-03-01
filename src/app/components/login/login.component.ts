import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators'

import { makeToast } from 'src/app/shared/functions';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted: boolean
    loading: boolean
    user: any
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(4)]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        })
    }

    get getControls() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true

        if (this.loginForm.invalid) {
            makeToast("Хэрэглэгчийн нэр 4 өөс дээш урттай ,<br> нууц үг 8 аас дээш урттай байна", 'error')
            return
        }
        this.loading = true

        this.authService.login(this.getControls.username.value, this.getControls.password.value).subscribe(
            user => {
                if (user != null) {
                    if (user.role == 1)
                        this.router.navigate(['/admin']);
                    else
                        this.router.navigate(['/cashier']);
                    localStorage.setItem('currentUser', JSON.stringify(user))
                }
                else
                    makeToast("Хэрэглэгчийн нэр эсвэл , нууц үг буруу байна", "error")
            },
            error => {
                makeToast("Сервертэй холбогдоход алдаа гарлаа", "error")
            }
        )


    }

    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


    // convenience getter for easy access to form fields
    // get f() { return this.loginForm.controls; }

    // onSubmit() {
    // }
}