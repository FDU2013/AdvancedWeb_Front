import { Component,OnInit } from '@angular/core';
import ElseGame from "../../assets/js/ElseGame";

@Component({
  selector: 'app-else-game-page',
  templateUrl: './else-game-page.component.html',
  styleUrls: ['./else-game-page.component.less']
})
export class ElseGamePageComponent implements OnInit {
  game:ElseGame;
  constructor() {
  }
  ngOnInit() {
    this.game=new ElseGame();
  }
}
