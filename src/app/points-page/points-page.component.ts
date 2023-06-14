import { Component } from '@angular/core';
import {PageHeaderComponent} from "../page-header/page-header.component";
import {ProductItemComponent} from "../product-item/product-item.component";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";
import {PeriodicElement} from "../admin-page/admin-page.component";
import { PageEvent } from '@angular/material/paginator';
import {response} from "express";
export interface ScoreRecordItem {
  tradeID:any,
  userID:any,
  itemID:any,
  imageURL:any,
  itemName:any,
  cost:any,
  description:any,
  code:any,
  time:any,
  state:any
}

let ELEMENT_DATA: ScoreRecordItem[] = [
];

@Component({
  selector: 'app-points-page',
  templateUrl: './points-page.component.html',
  styleUrls: ['./points-page.component.less']
})
export class PointsPageComponent {
  constructor(private httpService: HttpService,private router: Router) {}
  products=[

  ];
  personalInfo={
    "stuNum":"20302010032",
    "phone": "13906638321",
    "name": "张佳洵",
    "userID": "1234zjx",
    "email": "20302010032@fudan.edu.cn",
    "score":100,
    "todayScore":0,
    "avatar":"www.aaa.com"//头像URL
  };
  getPersonalInfo(){
    this.httpService.post("/api/user/info").subscribe(response=>{
      if(response.code === 200){
        this.personalInfo = response.data;
      }else{
        alert(response.msg);
      }
    })
  }
  getItems(){
    this.httpService.post("/api/user/getItems").subscribe(response=>{
      if(response.code === 200){
        this.products=response.data;
      }
    })
  }
  dataSource = [];
  getMyItem(){
    this.httpService.post("/api/user/myItem",this.pageInfo).subscribe(response=>{
      if(response.code === 200){
        ELEMENT_DATA=response.data.records;
        console.log(ELEMENT_DATA)
        this.dataSource = ELEMENT_DATA;
      }
    })

  }
  ngOnInit() {
    this.getPersonalInfo();
    this.getItems();
    this.getMyItem();
  }
  //displayedColumns: string[] = ['订单ID', '用户名', '商品编号','图片','商品名','消耗','描述','兑换码','兑换时间','状态'];
  displayedColumns: string[]= ['tradeID','itemID','itemName','cost','code','time','state'];

  total = 100;
  pageInfo = {
    pageSize:10,
    pageNum:1
  }
  pageChanged(event: PageEvent): void {
    this.pageInfo.pageNum = event.pageIndex;
    // 在这里可以使用当前页码执行相关操作，例如发起 API 请求等
    console.log('当前页码：', this.pageInfo.pageNum);
  }
}
