import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.page.html',
  styleUrls: ['./level1.page.scss'],
})
export class Level1Page implements OnInit {

  public cardsTotal =12; // Total cards to match on Easy mode
  public cardsArray = []; // Store all card pairs
  public playerLife = 4; // Amount of tries player gets
  public imageDir = '../assets/img/Images/'; // Directory for images
  public imageArray = ['Audio','Camera','Controller','Film','Mic','Movie','Radio','TV'];


  //Selected card positions and values
  public selectCard1pos = -1;
  public selectCard1val = -1;  
  public selectCard2pos = -1;
  public selectCard2val = -1;

  public debugText ="Debugtext";
  
  constructor() { }

  ngOnInit() {
    this.populateCards();
    this.shuffle(this.cardsArray);
    this.shuffle(this.imageArray);
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
  selectCard(pos, val){
    //First card
    this.selectCard1pos = pos;
    this.selectCard1val = val;
    this.debugText = "POS: " + pos + " and val: " + val;
  }
  //reset selected cards
  resetSelected(){
    this.selectCard1pos = -1;
    this.selectCard1val = -1;  
    this.selectCard2pos = -1;
    this.selectCard2val = -1;
  }
}
