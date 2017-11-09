import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { TemplateComponent } from '../template.component';
import { Word } from '../../../model/word';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrls: ['./type-card.component.css']
})
export class TypeCardComponent implements OnInit, TemplateComponent {

  @Input() word: Word;
  wordFinished: Subject<string>;

  constructor() { }

  init(word: Word): void {

  }

  ngOnInit() {
  }

}
