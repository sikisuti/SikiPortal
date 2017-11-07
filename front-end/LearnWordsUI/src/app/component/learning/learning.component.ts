import { Component, OnInit, ComponentFactoryResolver, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Word } from '../../model/word';
import { WordService } from '../../service/word.service';
import { FlipCardComponent } from '../learn-type/flip-card/flip-card.component';
import { TypeCardComponent } from '../learn-type/type-card/type-card.component';
import { WordDirective } from '../learn-type/word.directive';
import { TemplateComponent } from '../learn-type/template.component';
import { AuthService } from '../../service/auth.service';

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
    private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.startSession();
    this.wordService.progressBuffer.subscribe(buffer => this.progressBuffer = buffer);
    this.wordService.progressValue.subscribe(value => this.progressValue = value);
  }

    loadComponent() {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipCardComponent);

      const viewContainerRef = this.wordHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
//      console.log(JSON.stringify(this.words[this.actIndex]));
      (<TemplateComponent>componentRef.instance).word = this.word;
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
//    console.log('getWords()');
    try {
      this.word = this.wordService.nextWord();
    } catch (error) {
      if (error['message'] === 'EndOfSession') {
        this.wordService.sendData().subscribe(res => {
          this.router.navigate(['/home']);
        });
      }
    }
//    console.log('words get: ' + JSON.stringify(this.words));
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
      default:
        console.log(message);
    }
  }
}
