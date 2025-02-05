import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'catvice';

  advice = ""
  src = ""
  question = "Loading..."
  answer1 = "Loading..."
  answer2 = "Loading..."
  answer3 = "Loading..."
  answer4 = "Loading..."

  show = false
  result = ""
  space = ""

  constructor() {
    //this.getSpace()
    this.getCat()
    this.getAdvice() 
    this.getTrivia() 
    
  }

  getCat(){
    fetch('https://api.thecatapi.com/v1/images/search')
    .then(response => response.json())
    .then(data => {
        this.src = data[0].url;
    });
  }

  getAdvice(){
    fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(data => {
      this.advice = "\" " + data.slip.advice + "\" ";
    });
  }

  getTrivia(){
    fetch('https://opentdb.com/api.php?amount=1&type=multiple')
  .then(response => response.json())
  .then(data => {
    this.question = (data.results[0].question).replaceAll("&amp", "&").replaceAll("&quot;", "\"").replaceAll("&#039;", "'");
    console.log(data.results[0])
    this.answer1 = data.results[0].correct_answer;
    this.answer2 = data.results[0].incorrect_answers[0];
    this.answer3 = data.results[0].incorrect_answers[1];
    this.answer4 = data.results[0].incorrect_answers[2];
  })
  .catch((error: Error) => {
    console.log(error)
    this.question = "An error has happend - please reload the page.";
    })
  }

  /*getSpace(){
    const key = "cIezdQTt0Td2CwumcTNDBzKxYHA6ONhDQmTnjg9j"
    fetch("https://api.nasa.gov/planetary/apod?api_key=" + key + "&thumbs=true")
    .then(response => response.json())
    .then(data => {
      console.log(data.url);
      this.space = data.thumbnail_url;
    })
  }*/


  }

