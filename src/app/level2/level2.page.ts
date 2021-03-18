import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.page.html',
  styleUrls: ['./level2.page.scss'],
})
export class Level2Page implements OnInit {

  public cardsTotal =12; // Total cards to match on Easy mode
  public cardsArray = []; // Store all card pairs
  public playerLife = 6; // Amount of tries player gets
  public imageDir = '../assets/img/Images/'; // Directory for images
  public imageArray = ['Audio','Camera','Controller','Film','Mic','Movie','Radio','TV'];


  //Selected card positions and values
  public selectCard1pos = -1;
  public selectCard1val = -1;  
  public selectCard2pos = -1;
  public selectCard2val = -1;
  public selectOldpos = -1;

  public debugText ="Debugtext";
  
  constructor() { }

  ngOnInit() {
    this.resetGame();
  }


// Function to populate cards array with positions and value pairs
  populateCards(){
    this.cardsArray = [];
    var x = 0;
    var y = 0;

    for(var i = 0; i < this.cardsTotal; i++){
      //push card to an array and assign values
      this.cardsArray.push({pos:i,val:y});
      //Flip x to assing next card the same value
      if (x == 0 ) x = 1;
      else { x= 0; y++}
    }
  }

  //Suffling an array
  shuffle(a){
    var j, x, i;
    for (i = a.length; i; i--) {
      j=Math.floor(Math.random() * i);
      x = a[i-1];
      a[i -1 ]= a[j];
      a[j] = x;
    }
  }

  //function to select a card
  selectCard(pos, val, i){
    var actOne = false;

    //Second card
    if(this.selectCard1pos > -1 && this.selectCard2pos == -1) {
      this.selectCard2pos = pos;
      this.selectCard2val = val;
      actOne = true;
    }

    //First card
    if(this.selectCard1pos == -1 && !actOne){
      this.selectCard1pos = pos;
      this.selectCard1val = val;
      this.selectOldpos = i;
    }
      
    // Both cards selected, check for match or fail
    if(actOne && this.selectCard1pos > -1 && this.selectCard2pos > -1){
      setTimeout(() => {
        //if the cards match
        if(this.selectCard1val == this.selectCard2val) {
          this.debugText = "Cards match";
          this.cardsArray.splice(this.selectOldpos, 1, {pos: this.selectOldpos, val: -1});
          this.cardsArray.splice(i, 1, {pos: i, val: -1});
          this.resetSelected();
        } else {
        //if they don't match
          this.debugText = "Cards don't match";
          this.playerLife -= 1;
          this.resetSelected();
          if(this.playerLife <= 0 ){
            this.resetGame();
          }
        }
        
      }, 1500)
    }
    
  }
  resetGame(){
    this.playerLife = 6;
    this.populateCards();
    this.resetSelected();
    this.shuffle(this.cardsArray);
    this.shuffle(this.imageArray);
  }

  //reset selected cards
  resetSelected(){
    this.selectCard1pos = -1;
    this.selectCard1val = -1;  
    this.selectCard2pos = -1;
    this.selectCard2val = -1;
  }
}
