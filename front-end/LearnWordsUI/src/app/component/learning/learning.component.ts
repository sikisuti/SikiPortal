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

  words: Word[] = [];
  actIndex: number;
  @ViewChild(WordDirective) wordHost: WordDirective;

  constructor(private wordService: WordService, private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.startSession();
  }

    loadComponent() {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipCardComponent);

      const viewContainerRef = this.wordHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
//      console.log(JSON.stringify(this.words[this.actIndex]));
      (<TemplateComponent>componentRef.instance).word = this.words[this.actIndex];
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
        this.getWords();
      }
    });
  }

  getWords(): void {
//    console.log('getWords()');
    try {
      this.words = this.wordService.getSet();
    } catch (error) {
      if (error['message'] === 'EndOfSession') {
        this.wordService.sendData().subscribe(res => {
          this.router.navigate(['/home']);
        });
      }
    }
//    console.log('words get: ' + JSON.stringify(this.words));
    this.actIndex = 0;
    this.loadComponent();
  }

  onSendResult(message: string): void {
    switch (message) {
      case 'revise':
        this.actIndex = (this.actIndex + 1) % this.words.length;
        this.loadComponent();
        break;
      case 'skip':
        this.words.splice(this.actIndex, 1);
        if (this.words.length === 0) {
          this.getWords();
        } else {
          this.actIndex = this.actIndex % this.words.length;
          this.loadComponent();
        }
        break;
      default:
        console.log(message);
    }
  }
}