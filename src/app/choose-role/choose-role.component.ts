import { Component } from '@angular/core';
import {HttpService} from "../http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.less']
})
export class ChooseRoleComponent {

  constructor(private httpService: HttpService,private router: Router) {}

  model = "";
  color = "";
  room = sessionStorage.getItem("room");
  submit(){
    sessionStorage.setItem("model",this.model)
    sessionStorage.setItem("color",this.color)
    if(this.room === "画展"){
      this.router.navigateByUrl("game");
    }else{
      this.router.navigateByUrl("elseGame");
    }
  }
}
