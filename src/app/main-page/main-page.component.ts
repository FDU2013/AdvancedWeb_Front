import {Component, NgModule, OnInit} from '@angular/core';
import {PageHeaderComponent} from "../page-header/page-header.component";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";
import {SessionStorage} from "ngx-webstorage";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit{
  constructor(private httpService: HttpService,private router: Router) {}
  pageHeaderComponent:PageHeaderComponent;
  dropdownOpen = false;
  selectedOption = '';
  rooms = [
    {
      label:"”从波提切利到梵高“画展",
      value:"”从波提切利到梵高“画展"
    },
    {
      label:"其他",
      value:"其他"
    },
  ];
  topics = [
    {
      label:"”从波提切利到梵高“画展",
      value:"”从波提切利到梵高“画展"
    },
  ];
  roomSelect = "";
  topicSelect = "";
  // personalInfo={
  //   "stuNum":"20302010032",
  //   "phone": "13906638321",
  //   "name": "张佳洵",
  //   "userID": "1234zjx",
  //   "email": "20302010032@fudan.edu.cn",
  //   "score":100,
  //   "todayScore":0,
  //   "avatar":"www.aaa.com"//头像URL
  // };
  personalInfo={
    "stuNum":"",
    "phone": "",
    "name": "",
    "userID": "",
    "email": "",
    "score":0,
    "todayScore":0,
    "avatar":""//头像URL
  };
  submitRoom(){
    if(this.roomSelect === ""){
      alert("请选择一个房间！")
    }else if(this.roomSelect === "”从波提切利到梵高“画展"){
      sessionStorage.setItem("room","画展");
      this.router.navigateByUrl("role");
    }else{
      sessionStorage.setItem("room","其他");
      this.router.navigateByUrl("role");
    }
  }
  submitTopic(){
    if(this.topicSelect === ""){
      alert("请选择一个主题！")
    }else{
      sessionStorage.setItem("topic","画展");
      this.router.navigateByUrl("problem");
    }
  }
  getPersonalInfo(){
    this.httpService.post("/api/user/info").subscribe(response=>{
      if(response.code === 200){
        this.personalInfo = response.data;
        console.log(response.data)
      }else{
        alert(response.msg);
      }
    })
  }
  ngOnInit() {
    this.getPersonalInfo();
  }
}
