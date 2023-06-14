import { Component,OnInit } from '@angular/core';
import Game from 'src/assets/js/game'
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.less']
})
export class GamePageComponent implements OnInit{
  game:Game;
  constructor() {
  }
  ngOnInit() {
    this.game=new Game();
    console.log("ngOnInit");
  }

}
