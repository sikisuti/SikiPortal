import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/core';
import { TemplateComponent } from '../template.component';
import { Subject } from 'rxjs/Subject';
import { Word } from '../../../model/word';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-spell-card',
  templateUrl: './spell-card.component.html',
  styleUrls: ['./spell-card.component.css'],
  animations: [
    trigger('reviseWord', [
      state('init', style({opacity: 1, transform: 'translateX(0)'})),
      state('revise', style({opacity: 0, transform: 'translateX(300px)'})),
      transition('init => revise', animate('200ms'))
    ]),
    trigger('skipWord', [
      state('init', style({opacity: 1, transform: 'translateY(0)'})),
      state('skip', style({opacity: 0, transform: 'translateY(300px)'})),
      transition('init => skip', animate('200ms'))
    ]),
    trigger('setKnown', [
      state('init', style({opacity: 1, transform: 'translateY(0)'})),
      state('known', style({opacity: 0, transform: 'translateY(-300px)'})),
      transition('init => known', animate('200ms'))
    ]),
    trigger('newWord', [
      transition('* => *', [
        animate(200, keyframes([
            style({opacity: 0, transform: 'translateX(-300px)', offset: 0}),
            style({opacity: 1, transform: 'translateX(0)', offset: 1})
        ]))
      ])
    ]),
    trigger('turnOver', [
      state('init', style({ transform: 'rotateY(0)' })),
      state('turned', style({ transform: 'rotateY(90deg)' })),
      transition('init <=> turned', animate('200ms'))
    ])
  ]
})
export class SpellCardComponent implements OnInit, TemplateComponent, OnChanges, AfterViewInit {

  @ViewChild('answerfield') private answerField: ElementRef;

  wordFinished: Subject<string> = new Subject();
  word: Word;
  answer: string;

  reviseWordStarter = 'init';
  skipWordStarter = 'init';
  setKnownStarter = 'init';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.answerField.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }

  init(word: Word): void {
    this.word = word;
  }

  answerChanged(newValue) {
    this.answer = newValue;
    if (newValue === this.word['foreignWord'].replace(/\(.*$/gi, '').trim()) {
      setTimeout(() => {
        this.skipWordStarter = 'skip';
      }, 1000);
    }
    // console.log(newValue);
  }

  reviseWordDone(event: Event) {
    if (event['toState'] !== 'init') {
      this.wordFinished.next(event['toState']);
    }
  }

  revise(): void {
    this.answer = this.word['foreignWord'];
  }

  ok(): void {
    this.reviseWordStarter = 'revise';
  }

}
