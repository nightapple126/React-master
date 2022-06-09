import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../services/user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  isAPILoading: boolean = false
  constructor(
    public formbuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
  ) { 
    this.login = formbuilder.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
      'password': [null,Validators.compose([Validators.required, Validators.minLength(3)])]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    if (this.login.valid) {
      this.loginApi({
        username: formData.value.username,
        password: formData.value.password
      });
    } else {
      if (this.login.controls.username.invalid) {
        if (this.login.controls.username.errors) {
          if (this.login.controls.username.errors.required) {
            this.snackBar.open('Username is required', "", { duration: 2000 });
          } else if (this.login.controls.username.errors.minlength) {
            this.snackBar.open('Username required minimum 3 characters', "", { duration: 2000 });
          } else if (this.login.controls.username.errors.maxlength) {
            this.snackBar.open('Username required maximum 255 characters', "", { duration: 2000 });
          } 
        }
      }else if (this.login.controls.password.invalid) {
        if (this.login.controls.password.errors) {
          if (this.login.controls.password.errors.required) {
            this.snackBar.open('Password is required', "", { duration: 2000 });
          } else if (this.login.controls.password.errors.minlength) {
            this.snackBar.open('Password required minimum 3 characters', "", { duration: 2000 });
          } 
        }
      }
    }
  }

  loginApi = (params:any) => {
    this.isAPILoading = true;
     this.userService.loginApi(params).subscribe(result=>{
       this.isAPILoading = false;
       if(result.status == true) {
        localStorage.setItem('token',result.return_id);
        var currentUser = this.userService.getUser();
        if(currentUser.role == 1) {
          this.snackBar.open('Login Successful', "", { duration: 2000 });
          this.router.navigate(['/users'])
        } else {
          this.snackBar.open('Permission denied', "", { duration: 2000 });
        }
       } else {
        this.snackBar.open(result.message, "", { duration: 2000 });
       }
     })
  }

}
