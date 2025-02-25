import { Component } from '@angular/core';
import { Place, Card } from './quiz.types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz',
  imports: [NgIf],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  card: Card = {
    count: 0,
    front: "Map",
    back: "Name+Capital",
    place: {
      id: 295,
      name: "Europe",
      capital: "helllllocapital",
      map: "ug-map-europe-nobox.png",
      flag: "ug-flag-afghanistan.svg",
      tags: [
        "Continents"
      ]
    },
    finished: false
  }

  showBack: boolean = false;

  toggleCard() {
    this.showBack = !this.showBack;
  }

  getFront() : string {
    if (this.card.front === "Name+Capital") {
      return this.card.place.capital 
        ? `${this.card.place.name} (${this.card.place.capital})` 
        : this.card.place.name;
    }
    if (this.card.front === "Name") {
      return this.card.place.name;
    }
    if (this.card.front === "Capital") {
      return this.card.place.capital ? this.card.place.capital : "error";
    }
    if (this.card.front === "Map") {
      return this.card.place.map ? `media/maps/${this.card.place.map}` : "error";
    }
    if (this.card.front === "Flag") {
      return this.card.place.flag ? `media/flags/${this.card.place.flag}` : "error";
    }
    return "error";
  }

  getBack() : string {
    if (this.card.back === "Name+Capital") {
      return this.card.place.capital 
        ? `${this.card.place.name} (${this.card.place.capital})` 
        : this.card.place.name;
    }
    if (this.card.back === "Name") {
      return this.card.place.name;
    }
    if (this.card.back === "Capital") {
      return this.card.place.capital ? this.card.place.capital : "error";
    }
    return "error";
  }
}
