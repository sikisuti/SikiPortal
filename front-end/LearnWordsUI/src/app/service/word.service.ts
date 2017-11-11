import { Injectable } from '@angular/core';
import { Word } from '../model/word';
import { WORDS } from '../mock/mock-words';
import { SENTENCES } from '../mock/mock-sentences';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WordService {
  private MAX_TURNS = 10;

  public progressValue: Subject<number> = new Subject();
  public progressBuffer: Subject<number> = new Subject();

  private words: Word[];
  private currentWords: Word[];
  private tempList: Word[];
  private sentences: Word[];
  private round;
  private actIndex: number;

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
            this.getSet();
            this.progressValue.next(0);
            this.progressBuffer.next(0);
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

  getSet(): void {
    if (this.round === this.MAX_TURNS) {
      throw new Error('EndOfSession');
    }

    this.round += 1;
    if (this.round < 4) {
      this.currentWords = this.shuffle(this.words.slice());
      this.currentWords.forEach(word => { word['nativeSide'] = true; });
      this.currentWords.push(this.sentences[(this.round - 1) % this.sentences.length]);
    }	else if (this.round < 7) {
      this.currentWords = this.shuffle(this.words.slice());
      this.currentWords.forEach(word => { word['nativeSide'] = false; });
      this.currentWords.push(this.sentences[(this.round - 1) % this.sentences.length]);
    }	else if (this.round === 7 || this.round === 9) {
      this.tempList = this.shuffle(this.words.slice());
      this.tempList.forEach(word => { word['nativeSide'] = Math.random() >= 0.5; });
      this.currentWords = this.tempList.slice();
      this.currentWords.push(this.sentences[(this.round - 1) % this.sentences.length]);
    } else if (this.round === 8 || this.round === 10) {
      this.currentWords = this.tempList.slice();
      this.currentWords.forEach(word => word['nativeSide'] = !word['nativeSide']);
      this.currentWords.push(this.sentences[(this.round - 1) % this.sentences.length]);
    }
//    console.log('round: ' + this.round);
//    console.log(JSON.stringify(tempList));
    this.actIndex = -1;
  }

  nextWord(): Word {
    if (this.currentWords.length === 0) {
      this.getSet();
    }

    this.actIndex = (this.actIndex + 1) % this.currentWords.length;
    this.calcProgress();
    return this.currentWords[this.actIndex];
  }

  skipWord(): void {
    this.currentWords.splice(this.actIndex, 1);
    this.actIndex -= 1;
  }

  setKnown(): Observable<any> {
    const wordID = this.currentWords[this.actIndex].wordID;
    const userWordID = this.currentWords[this.actIndex].userWordID;

    if (userWordID == null) {
      return this.http.post('/learnWords/userWord/' + wordID, {}, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
     })
        .map(response => {
          this.words.splice(this.words.map(function(word){ return word.wordID; }).indexOf(wordID), 1);
          if (this.tempList !== undefined && this.tempList.length > 0) {
            this.tempList.splice(this.tempList.map(function(word){ return word.wordID; }).indexOf(wordID), 1);
          }
          this.currentWords.splice(this.actIndex, 1);
          this.actIndex -= 1;
        }, err => { console.log(err); });
    } else {
      return this.http.put('/learnWords/userWord/' + userWordID, {}, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
     })
        .map(response => {
          this.words.splice(this.words.map(function(word){ return word.userWordID; }).indexOf(userWordID), 1);
          if (this.tempList !== undefined && this.tempList.length > 0) {
            this.tempList.splice(this.tempList.map(function(word){ return word.userWordID; }).indexOf(userWordID), 1);
          }
          this.currentWords.splice(this.actIndex, 1);
          this.actIndex -= 1;
        }, err => { console.log(err); });
    }
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

  calcProgress(): void {
    const all = this.MAX_TURNS * (this.words.length + 1);
    this.progressBuffer.next((this.round * (this.words.length + 1) * 100) / all);
    const current = ((this.round - 1) * (this.words.length + 1)) + (this.words.length + 1 - this.currentWords.length);
    const percentage = 100 * current / all;
    this.progressValue.next(percentage);
    console.log('all: ' + all + ' current: ' + current + ' percentage: ' + percentage +
      ' round: ' + this.round + ' wordLen: ' + (this.words.length + 1) + ' curWordLen: ' + this.currentWords.length);
  }

  addWord(newWord): Observable<any> {
    return this.http.post('/learnWords/word', newWord, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
   });
  }
}
