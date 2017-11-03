import { Injectable } from '@angular/core';
import { Word } from '../model/word';
import { WORDS } from '../mock/mock-words';

@Injectable()
export class WordService {

  private words: Word[];
  private turn = 0;

  constructor() { }

  startSession(): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.words = WORDS;
        resolve();
      }, 2000);
    });
  }

  getSet(): Word[] {
    return this.shuffle(this.words.slice());
  }

  private shuffle(array: Word[]): Word[] {
    let currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
