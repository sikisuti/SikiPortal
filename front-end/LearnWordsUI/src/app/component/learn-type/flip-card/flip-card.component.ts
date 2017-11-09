import { Component, OnInit, Input, Output, HostListener, Inject } from '@angular/core';
import { Word } from '../../../model/word';
import { trigger, state, style, animate, transition, keyframes } from '@angular/core';
import { TemplateComponent } from '../template.component';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WordService } from '../../../service/word.service';
import { AudioService } from '../../../service/audio.service';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.css'],
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
export class FlipCardComponent implements OnInit, TemplateComponent {

  @Input() word: Word;
  wordFinished: Subject<string> = new Subject();

  reviseWordStarter = 'init';
  skipWordStarter = 'init';
  setKnownStarter = 'init';
  turnStatus = 'init';
  isFlipped = false;

  constructor(private wordService: WordService, private audioService: AudioService) {}

  init(word: Word): void {
    this.word = word;
  }

  ngOnInit() {
  }

  @HostListener('window:keydown.space', ['$event'])
  onFlipCard() {
    this.turnStatus = 'turned';
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  onSwipeRight(event: any): void {
    this.reviseWordStarter = 'revise';
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  onSwipeDown(event: any): void {
    this.skipWordStarter = 'skip';
  }

  @HostListener('window:keydown.arrowup', ['$event'])
  onSwipeUp(event: any): void {
    this.setKnownStarter = 'known';
  }

  reviseWordDone(event: Event) {
    if (event['toState'] !== 'init') {
      this.wordFinished.next(event['toState']);
    }
  }

  turnOverDone(event: Event) {
    if (event['toState'] === 'turned') {
      this.isFlipped = !this.isFlipped;
      this.turnStatus = 'init';
    }
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    this.onSwipeRight(event);
  }

  play(): void {
    this.audioService.play(this.word['audioFile']);
  }
}
