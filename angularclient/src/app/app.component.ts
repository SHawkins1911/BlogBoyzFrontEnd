import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "./service/post-service";
import {User} from "./user";
import { UpdateService } from './service/update-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginBtn = "Login"
  title = 'BlogBoyz';
  isSetFields : boolean;
  showPostForm = false;
  showCreateUserModal = false;
  showSignInModal= false;
  userLoggedInFlag = false;

  user : User;
  loginUser : User ;
  tempUser:User;


  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService, public updateService : UpdateService) {
    this.user = new User();
    this.loginUser = new User();
    this.tempUser = new User();
  }

  ///////////MOVE TO BACK END vv ////////////

  async authUser(name) {
     this.isSetFields = false;
      this.postService.getUser(name).subscribe(data => {
        this.tempUser.user_id = data.user_id
        this.tempUser.name = data.name;
        this.tempUser.password = data.password;
      });

      this.sleep(500).then(() => {
        if (this.tempUser.name != "" && this.tempUser.password != "") {
          this.isSetFields = true;
        }
        if (this.isSetFields) {
          if (this.tempUser.name === this.loginUser.name && this.tempUser.password === this.loginUser.password) {
            this.loginBtn = "Logout";
            this.userLoggedInFlag = true;
            this.showSignInModal = false;
            alert("Login Succes")
           
        } else alert("Incorrect password!");
      }
    })
  }

////////////////////// ^^TO THE BACK ////////////////////////

  changeDisplayPostInput() {
    if (this.showPostForm ===false){
      this.showPostForm = true;}
    else this.showPostForm = false;
  }


  changeDisplayCreateUserModal() {
    if (this.showCreateUserModal === false){
      this.showCreateUserModal = true;}
    else this.showCreateUserModal = false;
  }

  changeDisplayLogin() {
      if (this.showSignInModal === false && this.userLoggedInFlag === false) {
        this.showSignInModal = true;
        this.loginUser.name = ""
        this.loginUser.password = ""
      } else {
        this.loginBtn = "Login"
        this.showSignInModal =false
        this.userLoggedInFlag = false
      }
  }

  createUser() {
    this.postService.saveUser(this.user).subscribe( ()=> console.log("success"));
    alert("user created")
    this.changeDisplayCreateUserModal()
    this.user.name = ""
    this.user.password = ""
  }


   sleep = function(time) {
    return new Promise(resolve => {setTimeout(resolve,time)})
   }


}
