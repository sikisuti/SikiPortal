import { Injectable } from '@angular/core';
import { Word } from '../model/word';
import { WORDS } from '../mock/mock-words';
import { SENTENCES } from '../mock/mock-sentences';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WordService {

  private words: Word[];
  private sentences: Word[];
  private round;

  constructor(private http: HttpClient) { }

  startSession(callback): void {

    this.http.get<Word[]>('/learnWords/words').subscribe(
      words => {
        this.words = words;
//        console.log('words set');
        this.http.get<Word[]>('/learnWords/sentence').subscribe(
          sentence => {
            this.sentences = sentence;
            this.sentences.forEach(s => { s['nativeSide'] = true; });
//            console.log('sentences: ' + JSON.stringify(this.sentences));
            this.round = 0;
            callback(200);
        }, sentenceError => {
            console.log('sentence error: ' + JSON.stringify(sentenceError));
            callback(sentenceError.status);
        });
    }, wordError => {
        console.log(JSON.stringify(wordError));
        callback(wordError.status);
    });
    /*
    return new Observable(observer => {
      setTimeout(() => {
        this.words = WORDS;
        this.sentences = SENTENCES;
        this.sentences.forEach(sentence => { sentence['side'] = 0; });
        this.round = 0;
        observer.next();
      }, 2000);
    });
    */
  }

  getSet(): Word[] {
    this.round += 1;
    if (this.round === 3) {
      throw new Error('EndOfSession');
    }

    const tempList = this.shuffle(this.words.slice());
    if (this.round < 4) {
      tempList.forEach(word => { word['nativeSide'] = true; });
      tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
    }	else if (this.round < 7) {
      tempList.forEach(word => { word['nativeSide'] = false; });
      tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
    }	else {
      tempList.forEach(word => { word['nativeSide'] = Math.random() >= 0.5; });
      tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
      this.round += 1;
      for (let i = 0; i < this.words.length; i++) {
        tempList[i + this.words.length + 1] = Object.assign({}, tempList[i]);
        tempList[i + this.words.length + 1]['nativeSide'] = !tempList[i]['nativeSide'];
      }
      tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
    }
//    console.log('round: ' + this.round);
//    console.log(JSON.stringify(tempList));
    return tempList;
  }

  sendData(): Observable<any> {
    const data = JSON.stringify(this.words);
    const config = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json'}),
      responseType: 'text'
    };
    return this.http.post('/learnWords/words', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
   });
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
