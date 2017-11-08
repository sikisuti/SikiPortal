import { Component, OnInit, Input, Output, HostListener, Inject } from '@angular/core';
import { Word } from '../../../model/word';
import { trigger, state, style, animate, transition, keyframes } from '@angular/core';
import { TemplateComponent } from '../template.component';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WordService } from '../../../service/word.service';

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

  constructor(public dialog: MatDialog, private wordService: WordService) { }

  ngOnInit() {
  }

  @HostListener('window:keydown.space', ['$event'])
  onFlipCard() {
    if (this.dialog.openDialogs.length !== 0) { return; }
    this.turnStatus = 'turned';
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  onSwipeRight(event: any): void {
    if (this.dialog.openDialogs.length !== 0) { return; }
    this.reviseWordStarter = 'revise';
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  onSwipeDown(event: any): void {
    if (this.dialog.openDialogs.length !== 0) { return; }
    this.skipWordStarter = 'skip';
  }

  @HostListener('window:keydown.arrowup', ['$event'])
  onSwipeUp(event: any): void {
    if (this.dialog.openDialogs.length !== 0) { return; }
    this.openDialog();
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.wordService.setKnown().subscribe(res => {
          this.setKnownStarter = 'known';
        });
      }
    });
  }
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Confirm</h2>
    <mat-dialog-content>You are about to set this word known. Are you sure?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
    `
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

}
