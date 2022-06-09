import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/constants/config';
import { UserService } from 'src/app/services/user.service';
import { navItems } from '../../_nav';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;
  currentUser:any
  profile_image: string = ""
  mediaBase:string= config.media_path
  constructor(
    private userService: UserService
  ) {
    this.currentUser = this.userService.getUser();
    this.profile_image = this.currentUser.profile_image.length>0 ? this.currentUser.profile_image : 'nouser.jpg'
   }

  ngOnInit(): void {
  }

  toggleMinimize(e:any) {
    this.sidebarMinimized = e;
  }

  logout = () => {
    localStorage.removeItem("token");
    location.href = config.base_url
  }

}
