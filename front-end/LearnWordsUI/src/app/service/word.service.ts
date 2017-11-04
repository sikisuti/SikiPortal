import { Injectable } from '@angular/core';
import { Word } from '../model/word';
import { WORDS } from '../mock/mock-words';
import { SENTENCES } from '../mock/mock-sentences';

@Injectable()
export class WordService {

  private words: Word[];
  private sentences: Word[];
  private round;

  constructor() { }

  startSession(): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.words = WORDS;
        this.sentences = SENTENCES;
        this.sentences.forEach(sentence => { sentence['side'] = 0; });
        this.round = 0;
        resolve();
      }, 2000);
    });
  }

  getSet(): Word[] {
    this.round += 1;
    if (this.round === 11) {
//      sendData();
    }

    const tempList = this.shuffle(this.words.slice());
    if (this.round < 4) {
      tempList.forEach(word => { word['side'] = 0; });
      tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
    }	else if (this.round < 7) {
      tempList.forEach(word => { word['side'] = 1; });
      tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
    }	else {
      tempList.forEach(word => { word['side'] = Math.round(Math.random()); });
      tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
      this.round += 1;
      for (let i = 0; i < this.words.length; i++) {
        tempList[i + this.words.length + 1] = Object.assign({}, tempList[i]);
        tempList[i + this.words.length + 1]['side'] = Math.abs(tempList[i]['side'] - 1);
      }
      tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
    }
    console.log('round: ' + this.round);
    console.log(JSON.stringify(tempList));
    return tempList;
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
