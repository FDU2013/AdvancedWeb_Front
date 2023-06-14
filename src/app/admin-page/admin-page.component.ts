import { Component, OnInit } from '@angular/core';
import { ColorHelper } from '@swimlane/ngx-charts';
import {PageEvent} from "@angular/material/paginator";
import {HttpService} from "../http.service";
import {io} from "socket.io-client";
export interface PeriodicElement {
  userID:any,
  score:any,
  todayScore:any,
  avatar:any
}

let ELEMENT_DATA: PeriodicElement[] = [
];
let chart = [];
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less']
})



export class AdminPageComponent implements OnInit{
  constructor(private httpService:HttpService) {

  }
  socket = io('http://localhost:2002');
  // chartData = [
  //   // {
  //   //   name: 'Label 1',
  //   //   value: 10,
  //   //   color: this.getRandomColor()
  //   // },
  //   // {
  //   //   name: 'Label 2',
  //   //   value: 20,
  //   //   color: this.getRandomColor()
  //   // },
  //   // {
  //   //   name: 'Label 3',
  //   //   value: 30,
  //   //   color: this.getRandomColor()
  //   // },
  //   // {
  //   //   name:'111',
  //   //   value:11,
  //   //   color: this.getRandomColor()
  //   // }
  // ];


  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  displayedColumns: string[] = ['userID', 'score', 'todayScore','avatar'];
  dataSource = [];

  total = 100;
  pageInfo = {
    pageSize:10,
    pageNum:1
  }
  getUser(){
    this.httpService.post("/api/admin/getAllUserInfo",this.pageInfo).subscribe(response=>{
      if(response.code === 200){
        this.total = response.data.total;
        ELEMENT_DATA = response.data.records;
        this.dataSource = ELEMENT_DATA;
      }
    })
  }
  chartData = [];
  getRoom(){
    this.socket.on('rooms',(room)=>{
      for (var key in room) {
        if (room.hasOwnProperty(key)) {
          var value = room[key];
          var color = this.getRandomColor();
          let obj = {
            name:key,
            value:value,
            color:color
          }
          chart.push(obj)
        }
      }
      this.chartData = chart;

      console.log(this.chartData);
    })
    this.socket.emit('get room');
  }
  ngOnInit() {
    this.getUser()
    this.getRoom()
  }

  pageChanged(event: PageEvent): void {
    this.pageInfo.pageNum = event.pageIndex;
    // 在这里可以使用当前页码执行相关操作，例如发起 API 请求等
    console.log('当前页码：', this.pageInfo.pageNum);
  }


}
