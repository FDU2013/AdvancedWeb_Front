import { Component } from '@angular/core';
import {HttpService} from "../http.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {

  constructor(private httpService: HttpService,private router: Router) {}

  LoginForm={
    userID:'',
    password:''
  };
  login(){
    this.httpService.post("/api/auth/login",this.LoginForm).subscribe((response)=>{
      if(response.code===200){
        let userID = response.data.userID;
        let role = response.data.role;
        let token = response.data.token;
        sessionStorage.setItem('userID',userID);
        sessionStorage.setItem('role',role);
        sessionStorage.setItem('token',token);
        if(role==="admin"){
          this.router.navigateByUrl("admin");
        }else{
          this.router.navigateByUrl("main");
        }
      }
    })
  }

}
