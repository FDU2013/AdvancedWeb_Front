import {Component, OnInit} from '@angular/core';
import {PageHeaderComponent} from "../page-header/page-header.component";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";
import {response} from "express";

@Component({
  selector: 'app-problem-page',
  templateUrl: './problem-page.component.html',
  styleUrls: ['./problem-page.component.less']
})
export class ProblemPageComponent implements OnInit{
  constructor(private httpService: HttpService,private router: Router) {}
  pageHeaderComponent:PageHeaderComponent;
  question: string = '这里是问题的文本';
  selectedOption: string = '';
  imageUrl = "https://ts1.cn.mm.bing.net/th/id/R-C.584acb73a283a65b2b7ee4492de590b0?rik=RfXtQaF4YcMYZQ&riu=http%3a%2f%2fp1.music.126.net%2ftQxajh-9xqTQ0kEb9YGrQQ%3d%3d%2f18973172649212573.jpg%3fsize%3d1600x1066&ehk=s1kkD5Q%2bwVgDh7U9oCm1SseehWhoryxfQEp6Tm7SYfQ%3d&risl=&pid=ImgRaw&r=0";
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
  optionA = "";
  optionB = "";
  optionC = "";
  questionInfo = {
    questionID:0,
    image:"",
    index:0,
    title:"",
    a:"",
    b:"",
    c:""
  }
  options: string[] = ["","",""];
  getPersonalInfo(){
    this.httpService.post("/api/user/info").subscribe(response=>{
      if(response.code === 200){
        this.personalInfo = response.data;
      }else{
        alert(response.msg);
      }
    })
  }
  getOneQuetion(){
    this.httpService.post("/api/question/getOne",{topic:"画展",previousIndex:this.questionInfo.questionID}).subscribe(response=>{
      if(response.code === 200){
        this.questionInfo = response.data;
        this.options[0]=this.questionInfo.a;
        this.options[1]=this.questionInfo.b;
        this.options[2]=this.questionInfo.c;
      }else{
        alert(response.msg);
      }
    })
  }
  submitAnswer(){
    let choose = "";
    if(this.selectedOption == this.questionInfo.a){
      choose = "A";
    }
    if(this.selectedOption == this.questionInfo.b){
      choose = "B";
    }
    if(this.selectedOption == this.questionInfo.c){
      choose = "C";
    }
    this.selectedOption = "";

    this.httpService.post("/api/question/commitAnswer",{questionID:this.questionInfo.questionID,choose:choose}).subscribe(response=>{
      if(response.code === 200){
        alert(response.msg);
        this.getOneQuetion();
      }
    })
  }
  ngOnInit() {
    this.getPersonalInfo();
    this.getOneQuetion();
  }
}
