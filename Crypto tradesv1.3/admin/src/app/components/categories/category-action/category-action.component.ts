/*
Project : Cryptotrades
FileName :  category-action.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for add and edit category details.
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';
import { FileUploader } from 'ng2-file-upload';
import { API } from 'src/app/constants/api';
import { config } from 'src/app/constants/config';

@Component({
  selector: 'app-category-action',
  templateUrl: './category-action.component.html',
  styleUrls: ['./category-action.component.css']
})
export class CategoryActionComponent implements OnInit {
  subscription: any;
  baseUrl: string = API.base_url;
  public uploader: FileUploader;
  avatarname: string = ''
  category_image: string = ''
  currentCategory: any;
  currentCategoryID: any;
  categoryInfo: any;
  categoryForm: FormGroup;
  isAPILoading: boolean = false
  spinner: boolean = false;
  page_title: string = "Add Category";
  button_title: string = "Create"

  /*
  * constructing the init functions,creating object for services and initializing file uploader
  */
  constructor(
    public formbuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.currentCategory = this.categoryService.getUser();
    this.categoryForm = formbuilder.group({
      'title': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
      'status': ["active"],
      'category_image': [""]
    })

    this.uploader = new FileUploader({
      url: API.base_url + '/media/category',
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
      this.avatarname = this.currentCategory.username + "_" + (new Date).getTime() + ext;
      file.file.name = this.avatarname

    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(item);
      console.log('Item');
      var _this = this;
      this.category_image = this.avatarname
      this.categoryForm.controls.category_image.setValue(this.category_image);
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
  /*
  * This is the function which used to initialize all functions
  */
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      if (params.id) {
        this.currentCategoryID = params.id;
        this.page_title = "Update Category";
        this.button_title = "Update"
        this.getCategoryInfo()
      } else {
        this.currentCategoryID = ""
      }
      console.log(params) //log the entire params object
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  /*
  * This is the function which used to get category details
  */
  getCategoryInfo = () => {
    this.categoryService.viewCategory(this.currentCategoryID).subscribe(result => {
      var resulter: any = result;
      this.categoryInfo = resulter.result;
      this.categoryInfo.is_follow = resulter.is_follow;
      this.categoryInfo.is_block = resulter.is_block;
      this.updateCategoryInfo()
    })
  }
  /*
  * This is the function which used to update category details
  */
  updateCategoryInfo = () => {
    this.category_image = this.categoryInfo.category_image.length > 0 ? this.categoryInfo.category_image : '';
    this.categoryForm.controls.title.setValue(this.categoryInfo.title);
    this.categoryForm.controls.status.setValue(this.categoryInfo.status);
  }
  /*
  * This is the function which used to when submit the form action
  */
  onSubmit(formData: any) {
    if (this.currentCategoryID == "") {
      this.categorySubmit(formData)
    } else {
      this.editCategorySubmit(formData)
    }
  }
  /*
  * This is the function which used to validate form and api call implementations
  */
  categorySubmit(formData: any) {
    if (this.categoryForm.valid) {
      if (formData.value.password != formData.value.confirm_password) {
        this.snackBar.open('Password Mismatch', "", { duration: 2000 });
        return;
      }
      this.categoryFormApi({
        title: formData.value.title,
        status: formData.value.status,
        category_image: formData.value.category_image,
      });
    } else {
      if (this.categoryForm.controls.title.invalid) {
        if (this.categoryForm.controls.title.errors) {
          if (this.categoryForm.controls.title.errors.required) {
            this.snackBar.open('Title is required', "", { duration: 2000 });
          } else if (this.categoryForm.controls.title.errors.minlength) {
            this.snackBar.open('Title required minimum 3 characters', "", { duration: 2000 });
          } else if (this.categoryForm.controls.title.errors.maxlength) {
            this.snackBar.open('Title required maximum 255 characters', "", { duration: 2000 });
          }
        }
      }
    }
  }
  /*
  * This is the function which used to add new category
  */
  categoryFormApi = (params: any) => {
    this.isAPILoading = true;
    this.categoryService.createCategory(params).subscribe(result => {
      this.isAPILoading = false;
      if (result.status == true) {
        this.snackBar.open('Category created successfully', "", { duration: 2000 });
        this.router.navigate(['/categories']);
      } else {
        this.snackBar.open(result.message, "", { duration: 2000 });
      }
    })
  }
  /*
  * This is the function which used to validate form and api call implementations
  */
  editCategorySubmit = (formData: any) => {
    if (this.categoryForm.controls.title.invalid) {
      if (this.categoryForm.controls.title.errors) {
        if (this.categoryForm.controls.title.errors.required) {
          this.snackBar.open('Title is required', "", { duration: 2000 });
        } else if (this.categoryForm.controls.title.errors.minlength) {
          this.snackBar.open('Title required minimum 3 characters', "", { duration: 2000 });
        } else if (this.categoryForm.controls.title.errors.maxlength) {
          this.snackBar.open('Title required maximum 255 characters', "", { duration: 2000 });
        }
      }
    } else {
      this.spinner = true
      this.updateCategoryApi({
        title: formData.value.title,
        category_image: formData.value.category_image,
        status: formData.value.status,
        category_id: this.currentCategoryID
      });
    }
  }
  /*
  * This is the function which used to update the existing category
  */
  updateCategoryApi = (params: any) => {
    this.categoryService.updateCategory(params).subscribe(result => {
      this.spinner = false;
      this.snackBar.open(result.message, "", { duration: 2000 });
      if (result.status == true) {
        if (this.currentCategory.user_id == this.currentCategoryID) {
          location.href = config.base_url
        } else {
          this.router.navigate(['/categories']);
        }
      }
    })
  }
}