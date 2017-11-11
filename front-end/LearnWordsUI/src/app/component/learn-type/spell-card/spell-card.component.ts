import { Component, OnInit } from '@angular/core';
import { TemplateComponent } from '../template.component';
import { Subject } from 'rxjs/Subject';
import { Word } from '../../../model/word';

@Component({
  selector: 'app-spell-card',
  templateUrl: './spell-card.component.html',
  styleUrls: ['./spell-card.component.css']
})
export class SpellCardComponent implements OnInit, TemplateComponent {

  wordFinished: Subject<string>;
  word: Word;

  constructor() { }

  ngOnInit() {
  }

  init(word: Word): void {
    this.word = word;
  }

}
