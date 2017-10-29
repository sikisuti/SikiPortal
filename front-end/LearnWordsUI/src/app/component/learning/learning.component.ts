import { Component, OnInit } from '@angular/core';
import { Word } from '../../model/word';
import { WordService } from '../../service/word.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  words: Word[] = [];
  actIndex: number;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.getWords();
  }

  getWords(): void {
    this.wordService.getWords().then(words => {
      this.words = words;
      this.actIndex = 0;
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
