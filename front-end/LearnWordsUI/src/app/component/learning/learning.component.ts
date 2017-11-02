import { Component, OnInit, ComponentFactoryResolver, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Word } from '../../model/word';
import { WordService } from '../../service/word.service';
import { FlipCardComponent } from '../learn-type/flip-card/flip-card.component';
import { TypeCardComponent } from '../learn-type/type-card/type-card.component';
import { WordDirective } from '../learn-type/word.directive';
import { TemplateComponent } from '../learn-type/template.component';

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
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getWords();
  }

    loadComponent() {

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipCardComponent);

      const viewContainerRef = this.wordHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      console.log(this.words[0]);
      (<TemplateComponent>componentRef.instance).word = this.words[0];
      this.changeDetectorRef.detectChanges();
    }

  ngOnDestroy() {
  }

  getWords(): void {
    this.wordService.getWords().then(words => {
      this.words = words;
      this.actIndex = 0;
      this.loadComponent();
    });
  }

  onSendResult(message: string): void {
    if (message === 'next') {
      this.actIndex = (this.actIndex + 1) % this.words.length;
    } else {
      console.log(message);
    }
  }
}
