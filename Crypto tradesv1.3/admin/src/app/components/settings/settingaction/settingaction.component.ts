/*
Project : Cryptotrades
FileName :  settingaction.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to manage the app settings
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settingaction',
  templateUrl: './settingaction.component.html',
  styleUrls: ['./settingaction.component.css']
})
export class SettingactionComponent implements OnInit {

  settings: FormGroup;
  spinner: boolean = false;
  constructor(
    public formbuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private settingsService: SettingsService
  ) {
    this.getOptions();
    this.settings = formbuilder.group({
      'admin_commission': [null,Validators.compose([Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,5})?$")])],
    })
  }

  ngOnInit(): void {
  }

  /*
  * This is the function which used to get the settings options
  */
  getOptions() {
    var blocks = ["admin_commission"];
    blocks.forEach((name) => {
      this.spinner = true
      this.settingsService.getOption(name).subscribe((result)=>{
        if (result.status === true) {
          this.settings.controls[name].setValue(result.result.value);
        }
        this.spinner = false
      })
    })
  }

  /*
  * This is the function which used to save the settings options
  */
  setOptions(formData:any) {

    if (this.settings.valid) {
      for (const [name, value] of Object.entries(formData.value)) {
        this.spinner = true
        var params = {
          name: name,
          value: value
        }
        this.settingsService.setOption(params).subscribe((result)=>{
          this.spinner = false
        })
      }
    } else {
      if (this.settings.controls.admin_commission.invalid) {
        this.snackBar.open('Admin Commission is invalid', "", { duration: 2000 });
      }
    }
  }
}
