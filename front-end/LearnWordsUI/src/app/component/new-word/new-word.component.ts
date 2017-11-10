import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from '../../model/word';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {

  foreignWord: string;
  private natives: Object;
  private oxfords: Object;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  search(word): void {
    console.log(this.foreignWord);

    this.http.get('/learnWords/searchNatives?word=' + this.foreignWord)
      .subscribe(response => {
        console.log(response);
        this.natives = response;
      }, err => {
        console.log(err);
      });

    this.http.get('/learnWords/searchOxford?word=' + this.foreignWord.replace(' ', '_'))
      .subscribe(response => {
        console.log(response);
        this.oxfords = response;
      }, err => {
        console.log(err);
      });

  }

}
