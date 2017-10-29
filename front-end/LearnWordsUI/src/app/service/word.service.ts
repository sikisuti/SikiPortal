import { Injectable } from '@angular/core';
import { Word } from '../model/word';
import { WORDS } from '../mock/mock-words';

@Injectable()
export class WordService {

  constructor() { }

  getWords(): Promise<Word[]> {
    return Promise.resolve(WORDS);
  }
}
