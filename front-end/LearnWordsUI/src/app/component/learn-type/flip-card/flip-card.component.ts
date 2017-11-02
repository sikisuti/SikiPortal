import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../../../model/word';
import { trigger, state, style, animate, transition, keyframes } from '@angular/core';
import { TemplateComponent } from '../template.component';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.css'],
  animations: [
    trigger('reviseWord', [
      transition('* => 1', [
        animate(600, keyframes([
            style({opacity: 1, transform: 'translateX(0)', offset: 0}),
            style({opacity: 0, transform: 'translateX(200px)', offset: 1})
        ]))
      ])
    ]),
    trigger('newWord', [
      transition('* => *', [
        animate(600, keyframes([
            style({opacity: 0, transform: 'translateX(-200px)', offset: 0}),
            style({opacity: 1, transform: 'translateX(0)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class FlipCardComponent implements OnInit, TemplateComponent {

  @Input() word: Word;
  @Output() sendResult: EventEmitter<string> = new EventEmitter<string>();

  reviseWordStarter = 0;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.sendResult.emit('Button pushed');
  }

  onSwipeRight(event: any): void {
    this.reviseWordStarter = 1;
  }

  reviseWordDone(event: Event) {
    this.sendResult.emit('next');
  }
}
