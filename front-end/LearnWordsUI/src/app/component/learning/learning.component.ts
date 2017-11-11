import { Component, OnInit, ComponentFactoryResolver, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Word } from '../../model/word';
import { WordService } from '../../service/word.service';
import { FlipCardComponent } from '../learn-type/flip-card/flip-card.component';
import { SpellCardComponent } from '../learn-type/spell-card/spell-card.component';
import { WordDirective } from '../learn-type/word.directive';
import { TemplateComponent } from '../learn-type/template.component';
import { AuthService } from '../../service/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit, AfterViewInit, OnDestroy {

  word: Word;
  @ViewChild(WordDirective) wordHost: WordDirective;
  progressValue = 0;
  progressBuffer = 0;

  constructor(private wordService: WordService, private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.startSession();
    this.wordService.progressBuffer.subscribe(buffer => this.progressBuffer = buffer);
    this.wordService.progressValue.subscribe(value => this.progressValue = value);
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SpellCardComponent);

    const viewContainerRef = this.wordHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
//      console.log(JSON.stringify(this.words[this.actIndex]));
    (<TemplateComponent>componentRef.instance).init(this.word);
    this.changeDetectorRef.detectChanges();
    (<TemplateComponent>componentRef.instance).wordFinished.subscribe(msg => this.onSendResult(msg));
  }

  ngOnDestroy() {
  }

  startSession(): void {
    this.wordService.startSession(status => {
//      console.log(status);
      if (status === 401) {
        this.authService.redirectUrl = '/learn';
        this.router.navigate(['/login']);
      } else {
//        console.log('session started');
        this.getNextWord();
      }
    });
  }

  getNextWord(): void {
    console.log('getWords()');
    try {
      this.word = this.wordService.nextWord();
    } catch (error) {
      if (error['message'] === 'EndOfSession') {
        this.wordService.sendData().subscribe(res => {
          this.router.navigate(['/home']);
        });
      }
    }
    console.log('words get: ' + JSON.stringify(this.word));
    this.loadComponent();
  }

  onSendResult(message: string): void {
    switch (message) {
      case 'revise':
        this.getNextWord();
        break;
      case 'skip':
        this.wordService.skipWord();
        this.getNextWord();
        break;
      case 'known':
        this.openSetKnownConfirmDialog();
        break;
      default:
        console.log(message);
    }
  }

  openSetKnownConfirmDialog(): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);

      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.wordService.setKnown().subscribe(res => {
            console.log('Word set to known');
          });
        }

        this.getNextWord();
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
