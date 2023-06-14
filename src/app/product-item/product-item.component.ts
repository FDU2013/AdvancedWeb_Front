import { Component,Input,OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {response} from "express";
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.less']
})
export class ProductItemComponent implements OnInit{
  constructor(private httpService:HttpService) {}
  @Input() itemID:any;
  @Input() imageURL:any;
  @Input() itemName:any;
  @Input() cost:any;
  @Input() description:any;
  submit(){
    this.httpService.post("/api/user/buyItem",{itemID:this.itemID}).subscribe(response=>{
      if(response.code === 200){
        alert(response.msg);
      }
    })
  }
  ngOnInit() {
    console.log(this.itemID)
  }
}
