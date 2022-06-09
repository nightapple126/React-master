/*
Project : Cryptotrades
FileName :  useraction.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to perform register, add and edit profiles
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../services/user.service';
import { FileUploader } from 'ng2-file-upload';
import { API } from 'src/app/constants/api';
import { config } from 'src/app/constants/config';
@Component({
  selector: 'app-useraction',
  templateUrl: './useraction.component.html',
  styleUrls: ['./useraction.component.css']
})
export class UseractionComponent implements OnInit {
  subscription:any;
  baseUrl:string = API.base_url;
  public uploader: FileUploader;
  avatarname:string = ''
  profile_image: string = ''
  currentUser: any;
  currentUserID:any;
  userInfo: any;
  register: FormGroup;
  isAPILoading: boolean = false
  spinner: boolean = false;
  page_title:string = "Add User";
  button_title:string = "Create"
  

  constructor(
    public formbuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.currentUser = this.userService.getUser();
    this.register = formbuilder.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
      'email': [null, Validators.compose([Validators.required, Validators.minLength(3),Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])],
      'first_name': [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
      'last_name': [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
      'password': ["",Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      'confirm_password': ["",Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      'status':["active"],
      'profile_image': [""]
    })

    this.uploader = new FileUploader({
      url: API.base_url + '/media/avatar',
      allowedMimeType: ['image/png', 'image/jpeg'],
      autoUpload: false,
      isHTML5: true,
      queueLimit: 1000,
      removeAfterUpload: false,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    });
    
     this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
    }

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onAfterAddingFile = (file) => {
      console.log("file is ", file);
      var ext = (file.file.type == "image/png") ? ".png" : ".jpg"
      this.avatarname = this.currentUser.username + "_" + (new Date).getTime() +  ext;
      file.file.name = this.avatarname
      
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(item);
      console.log('Item');
      var _this=this;
      this.profile_image = this.avatarname
      this.register.controls.profile_image.setValue(this.profile_image);
      setTimeout(() => {
        _this.spinner = false;
      }, 1000);

    }; 
    
    this.uploader.onWhenAddingFileFailed = (item) => {
      let that = this;
      setTimeout(() => {
        that.spinner = false;
      }, 1000);
      this.snackBar.open("Uploaded file should be JPEG/PNG", "", { duration: 2000 });
    }
  }

  /*
  * This is the function which used to upload image
  */
  uploadImage = () => {
    this.spinner = true;
    this.uploader.uploadAll();
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      if(params.id) {
        this.currentUserID = params.id;
        this.page_title = "Update User";
        this.button_title = "Update"
        this.getProfileInfo()
      } else {
        this.currentUserID = ""
      }
      console.log(params) //log the entire params object
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  /*
  * This is the function which used to get profile information
  */
  getProfileInfo = () => {
    this.userService.viewProfile(this.currentUserID).subscribe(result=>{
      var resulter:any = result;
      this.userInfo = resulter.result;
      this.userInfo.is_follow = resulter.is_follow;
      this.userInfo.is_block = resulter.is_block;
      this.updateProfileInfo()
    })
  }

  /*
  * This is the function which used to edit profile information
  */
  updateProfileInfo = () => {
    this.profile_image = this.userInfo.profile_image.length > 0 ? this.userInfo.profile_image : '';
    this.register.controls.username.setValue(this.userInfo.username);
    this.register.controls.email.setValue(this.userInfo.email);
    this.register.controls.first_name.setValue(this.userInfo.first_name);
    this.register.controls.last_name.setValue(this.userInfo.last_name);
    this.register.controls.status.setValue(this.userInfo.status);
  }

  /*
  * This is the function which used to register or edit profile information
  */
  onSubmit(formData: any) {
    if(this.currentUserID == "") {
       this.registrationSubmit(formData)
    } else {
      this.editProfileSubmit(formData)
    }

  }

  /*
  * This is the function which used to validate registeration form
  */
  registrationSubmit(formData:any) {
    if (this.register.valid) {
      if(formData.value.password != formData.value.confirm_password) {
        this.snackBar.open('Password Mismatch', "", { duration: 2000 });
        return;
      }
      this.registerApi({
        username: formData.value.username,
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        email: formData.value.email,
        password: formData.value.password,
        status: formData.value.status,
        profile_image: formData.value.profile_image,
      });
    } else {
      if (this.register.controls.username.invalid) {
        if (this.register.controls.username.errors) {
          if (this.register.controls.username.errors.required) {
            this.snackBar.open('Username is required', "", { duration: 2000 });
          } else if (this.register.controls.username.errors.minlength) {
            this.snackBar.open('Username required minimum 3 characters', "", { duration: 2000 });
          } else if (this.register.controls.username.errors.maxlength) {
            this.snackBar.open('Username required maximum 255 characters', "", { duration: 2000 });
          } 
        }
      } else if (this.register.controls.email.invalid) {
        if (this.register.controls.email.errors) {
        	console.log(this.register.controls.email.errors);
          if (this.register.controls.email.errors.required) {
            this.snackBar.open('Email is required', "", { duration: 2000 });
          } else if (this.register.controls.email.errors.minlength) {
            this.snackBar.open('Email required minimum 3 characters', "", { duration: 2000 });
          } else if (this.register.controls.email.errors.pattern) {
            this.snackBar.open('Invalid Email', "", { duration: 2000 });
          }
        }
      } else if (this.register.controls.first_name.invalid) {
        if (this.register.controls.first_name.errors) {
          if (this.register.controls.first_name.errors.required) {
            this.snackBar.open('First Name is required', "", { duration: 2000 });
          } else if (this.register.controls.first_name.errors.minlength) {
            this.snackBar.open('First Name required minimum 3 characters', "", { duration: 2000 });
          } else if (this.register.controls.first_name.errors.maxlength) {
            this.snackBar.open('First Name required maximum 32 characters', "", { duration: 2000 });
          } 
        }
      } else if (this.register.controls.last_name.invalid) {
        if (this.register.controls.last_name.errors) {
          if (this.register.controls.last_name.errors.required) {
            this.snackBar.open('Last Name is required', "", { duration: 2000 });
          } else if (this.register.controls.last_name.errors.minlength) {
            this.snackBar.open('Last Name required minimum 3 characters', "", { duration: 2000 });
          } else if (this.register.controls.last_name.errors.maxlength) {
            this.snackBar.open('Last Name required maximum 32 characters', "", { duration: 2000 });
          } 
        }
      } else if (this.register.controls.password.invalid) {
        if (this.register.controls.password.errors) {
          if (this.register.controls.password.errors.required) {
            this.snackBar.open('Password is required', "", { duration: 2000 });
          } else if (this.register.controls.password.errors.minlength) {
            this.snackBar.open('Password required minimum 3 characters', "", { duration: 2000 });
          } else if (this.register.controls.password.errors.maxlength) {
            this.snackBar.open('Password required maximum 32 characters', "", { duration: 2000 });
          } 
        }
      } else if (this.register.controls.confirm_password.invalid) {
        if (this.register.controls.confirm_password.errors) {
          if (this.register.controls.confirm_password.errors.required) {
            this.snackBar.open('Confirm Password is required', "", { duration: 2000 });
          } else if (this.register.controls.confirm_password.errors.minlength) {
            this.snackBar.open('Confirm Password required minimum 3 characters', "", { duration: 2000 });
          } else if (this.register.controls.confirm_password.errors.maxlength) {
            this.snackBar.open('Confirm Password required maximum 32 characters', "", { duration: 2000 });
          } 
        }
      }
    }
  }

  /*
  * This is the function which used to register or edit profile information
  */
  registerApi = (params:any) => {
    this.isAPILoading = true;
     this.userService.createUsers(params).subscribe(result=>{
       this.isAPILoading = false;
       if(result.status == true) {
        this.snackBar.open('User created successfully', "", { duration: 2000 });
        this.router.navigate(['/users']);
       } else {
        this.snackBar.open(result.message, "", { duration: 2000 });
       }
     })
  }

  /*
  * This is the function which used to validate edit profile form
  */
  editProfileSubmit = (formData:any) => {
    if (this.register.controls.username.invalid) {
      if (this.register.controls.username.errors) {
        if (this.register.controls.username.errors.required) {
          this.snackBar.open('Username is required', "", { duration: 2000 });
        } else if (this.register.controls.username.errors.minlength) {
          this.snackBar.open('Username required minimum 3 characters', "", { duration: 2000 });
        } else if (this.register.controls.username.errors.maxlength) {
          this.snackBar.open('Username required maximum 255 characters', "", { duration: 2000 });
        } 
      }
    } else if (this.register.controls.email.invalid) {
      if (this.register.controls.email.errors) {
        console.log(this.register.controls.email.errors);
        if (this.register.controls.email.errors.required) {
          this.snackBar.open('Email is required', "", { duration: 2000 });
        } else if (this.register.controls.email.errors.minlength) {
          this.snackBar.open('Email required minimum 3 characters', "", { duration: 2000 });
        } else if (this.register.controls.email.errors.pattern) {
          this.snackBar.open('Invalid Email', "", { duration: 2000 });
        }
      }
    } else if (this.register.controls.first_name.invalid) {
      if (this.register.controls.first_name.errors) {
        if (this.register.controls.first_name.errors.required) {
          this.snackBar.open('First Name is required', "", { duration: 2000 });
        } else if (this.register.controls.first_name.errors.minlength) {
          this.snackBar.open('First Name required minimum 3 characters', "", { duration: 2000 });
        } else if (this.register.controls.first_name.errors.maxlength) {
          this.snackBar.open('First Name required maximum 32 characters', "", { duration: 2000 });
        } 
      }
    } else if (this.register.controls.last_name.invalid) {
      if (this.register.controls.last_name.errors) {
        if (this.register.controls.last_name.errors.required) {
          this.snackBar.open('Last Name is required', "", { duration: 2000 });
        } else if (this.register.controls.last_name.errors.minlength) {
          this.snackBar.open('Last Name required minimum 3 characters', "", { duration: 2000 });
        } else if (this.register.controls.last_name.errors.maxlength) {
          this.snackBar.open('Last Name required maximum 32 characters', "", { duration: 2000 });
        } 
      }
    } else {
      if(formData.value.password.length>0 || formData.value.confirm_password.length>0) {
        if(formData.value.password != formData.value.confirm_password) {
          this.snackBar.open('Password Mismatch', "", { duration: 2000 });
          return;
        }
      }


      this.spinner = true
      this.updateProfileApi({
        username: formData.value.username,
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        email: formData.value.email,
        password: formData.value.password,
        profile_image: formData.value.profile_image,
        status: formData.value.status,
        user_id:this.currentUserID
      });

    }
  }

  /*
  * This is the function which used to update the profile
  */
  updateProfileApi = (params:any) => {
    this.userService.updateUsers(params).subscribe(result=>{
     this.spinner = false;
     this.snackBar.open(result.message, "", { duration: 2000 });
     if(result.status == true) {
       if(this.currentUser.user_id == this.currentUserID) {
        location.href = config.base_url 
       } else {
        this.router.navigate(['/users']);
       }
     }
    })
  }

}
