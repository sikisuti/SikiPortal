import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../../../model/word';
import { trigger, state, style, animate, transition, keyframes } from '@angular/core';
import { TemplateComponent } from '../template.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.css'],
  animations: [
    trigger('reviseWord', [
      state('init', style({opacity: 1, transform: 'translateX(0)'})),
      state('revise', style({opacity: 0, transform: 'translateX(500px)'})),
      transition('init => revise', animate('300ms'))
    ]),
    trigger('newWord', [
      transition('* => *', [
        animate(300, keyframes([
            style({opacity: 0, transform: 'translateX(-400px)', offset: 0}),
            style({opacity: 1, transform: 'translateX(0)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class FlipCardComponent implements OnInit, TemplateComponent {

  @Input() word: Word;
  wordFinished: Subject<string> = new Subject();

  reviseWordStarter = 'init';

  constructor() { }

  ngOnInit() {
  }

  onClick() {
  }

  onSwipeRight(event: any): void {
    this.reviseWordStarter = 'revise';
  }

  onSwipeDown(event: any): void {
    console.log('Down');
    this.reviseWordStarter = 'skip';
  }

  reviseWordDone(event: Event) {
    if (event['toState'] !== 'init') {
      this.wordFinished.next(event['toState']);
    }
  }
}
