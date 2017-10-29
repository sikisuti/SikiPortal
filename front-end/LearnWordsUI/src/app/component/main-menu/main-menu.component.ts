import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  animations: [
    trigger('stateChange', [
      state('in', style({
        transform: 'translateY(0)'
      })),
      state('out',   style({
        transform: 'translateY(-300px)'
      })),
      transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('200ms ease-out'))
    ])
  ]
})
export class MainMenuComponent implements OnInit {

  @Input() state: string;

  constructor() { }

  ngOnInit() {
  }

}
