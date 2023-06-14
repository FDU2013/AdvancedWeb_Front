import { Component,OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import { Router } from '@angular/router';
import * as qs from 'qs'
interface RegisterForm {
  uis: string;
  uisPassword: string;
  userID: string;
  password: string;
  passwordcheck: string;
  email: string;
  phone: string;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})

export class RegisterComponent implements OnInit{

  constructor(private httpService: HttpService,private router: Router) {}

  registerRuleForm: RegisterForm = {
    uis: '',
    uisPassword: '',
    userID: '',
    password: '',
    passwordcheck: '',
    email: '',
    phone: '',
    name: '',
  };

  uisWebPage = '';
  Jsessionid = '';
  validInput = [];
  Data = {
    username :'',
    password :'',
    lt :'',
    dllt :'',
    execution :'',
    _eventId :'',
    rmShown :'',
  };
  getUIS(){
    this.httpService.get("/uis/authserver/login?service=https%3A%2F%2Felearning.fudan.edu.cn%2Flogin%2Fcas%2F3").subscribe((response) =>{
      this.uisWebPage=response;
      console.log(111)
      this.anaylizeUis();
      console.log(11);
    })
  };

  anaylizeUis(): void {
    const pattForJsessionid = /<(link)[^>]*(jsessionid=)[^>]*>/gi;
    console.log(this.uisWebPage)
    const tempAction = this.uisWebPage.match(pattForJsessionid);

    if (tempAction !== null) {
      this.Jsessionid = tempAction[0].split("fudan.css;jsessionid=")[1].split("\"")[0];

      if (!this.Jsessionid) {
        document.cookie = localStorage.getItem("uisJesissionid")!;
      } else {
        document.cookie = 'JSESSIONID=' + this.Jsessionid;
        localStorage.setItem("uisJesissionid", 'JSESSIONID=' + this.Jsessionid);
      }
    }

    const pattForInput = /<(input)[^>]*name=[^>]*>/gi;
    const validInputMatches = this.uisWebPage.match(pattForInput);
    this.validInput = validInputMatches !== null ? validInputMatches : [];

    for (const item in this.validInput) {
      const tempData = { name: '', value: '' };
      tempData.name = this.validInput[item].split("name=\"")[1].split("\"")[0];
      tempData.value = this.validInput[item].split("value=\"")[1].split("\"")[0];

      switch (tempData.name) {
        case 'username':
          this.Data.username = tempData.value;
          break;
        case 'password':
          this.Data.password = tempData.value;
          break;
        case 'lt':
          this.Data.lt = tempData.value;
          break;
        case 'dllt':
          this.Data.dllt = tempData.value;
          break;
        case 'execution':
          this.Data.execution = tempData.value;
          break;
        case '_eventId':
          this.Data._eventId = tempData.value;
          break;
        case 'rmShown':
          this.Data.rmShown = tempData.value;
          break;
      }
    }
  }
  verifyUIS(){
    this.Data.username=this.registerRuleForm.uis
    this.Data.password=this.registerRuleForm.uisPassword
    let dataNew2 = qs.stringify(this.Data)
    let _this=this;
    fetch("/uis/authserver/login?service=https%3A%2F%2Felearning.fudan.edu.cn%2Flogin%2Fcas", {
      method: 'post',
      body: dataNew2,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      redirect: 'manual'
    }).then(function(response) {
      return response
    }).then(function(response) {
      if(response.status==500){
        alert("网络出错啦！请关闭浏览器或删除cookie后重试")
      }
      else if(response.status==200){
        alert("复旦uis账号或密码错误！")
      }
      else if(response.status==0&&response.type=='opaqueredirect'){
        _this.submitForm();
      }
    })
  };
  submitForm(){
    let formdata = {
      "stuNum":this.registerRuleForm.uis,
      "userID":this.registerRuleForm.userID,
      "password":this.registerRuleForm.password,
      "name":this.registerRuleForm.name,
      "email":this.registerRuleForm.email,
      "phone":this.registerRuleForm.phone
    }
    let _this=this
    this.httpService.post("/api/auth/register",formdata).subscribe(res=>{
      if(res.data.code=="200"){
        alert("注册成功！")
        this.router.navigateByUrl("login");
      }else{
        alert(res.data.msg)
      }
    })
  };
  ngOnInit(){
    this.getUIS()
  }
  validateForm(): boolean {
    // 进行表单验证逻辑
    // 在这里验证表单字段是否满足要求，返回 true 或 false
    // 示例验证逻辑，您可以根据实际需求进行修改
    if (this.registerRuleForm.password !== this.registerRuleForm.passwordcheck) {
      alert('两次输入密码不一致');
      return false;
    }
    if(this.registerRuleForm.uis===''||this.registerRuleForm.uisPassword===''||
      this.registerRuleForm.userID===''||this.registerRuleForm.password===''||
      this.registerRuleForm.passwordcheck===''||this.registerRuleForm.email===''||
      this.registerRuleForm.phone===''||this.registerRuleForm.name===''){
      alert('请填好所有信息再提交');
      return false;
    }
    return true;
  }

  register(){
    if (this.validateForm()) {
      this.verifyUIS();
    }
  }
}
