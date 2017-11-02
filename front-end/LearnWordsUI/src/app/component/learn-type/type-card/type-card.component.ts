import { Component, OnInit, Input } from '@angular/core';
import { TemplateComponent } from '../template.component';
import { Word } from '../../../model/word';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrls: ['./type-card.component.css']
})
export class TypeCardComponent implements OnInit, TemplateComponent {

  @Input() word: Word;

  constructor() { }

  ngOnInit() {
  }

}
