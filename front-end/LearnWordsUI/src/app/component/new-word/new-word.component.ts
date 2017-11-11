import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from '../../model/word';
import { Router } from '@angular/router';
import { WordService } from '../../service/word.service';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {

//  foreignWord: string;
  private natives: Object[];
  private oxfords: Object[];
//  nativeWord: string;
  newWord: Object = {
    foreignWord: '',
    native: '',
    definition: '',
    exampleSentence: '',
    lexicalCategory: '',
    pronunciation: '',
    audioFile: ''
  };

  constructor(private http: HttpClient, private router: Router, private wordService: WordService) { }

  ngOnInit() {
  }

  search(word): void {
    console.log(this.newWord['foreignWord']);

    this.http.get<Object[]>('/learnWords/searchNatives?word=' + this.newWord['foreignWord'])
      .subscribe(response => {
        console.log(response);
        this.natives = response;
      }, err => {
        console.log(err);
      });

    this.http.get<Object[]>('/learnWords/searchOxford?word=' + this.newWord['foreignWord'].replace(' ', '_'))
      .subscribe(response => {
        console.log(response);
        this.oxfords = response;
      }, err => {
        console.log(err);
      });
  }

  selectOxford(oxford): void {
    this.newWord['definition'] = oxford.definition;
  }

  submit(): void {
    if (this.newWord['native'] === '' || this.newWord['foreignWord'] === '' ||
    (this.oxfords !== undefined && this.oxfords.length > 0 && this.newWord['definition'] === '')) { return; }

    this.newWord['levelID'] = 1;
    if (this.newWord['audioFile'] == null) { this.newWord['audioFile'] = 'n/a'; }
    this.wordService.addWord(this.newWord).subscribe(response => {
      this.router.navigate(['/home']);
    }, function(err){
      console.log(err);
    });
  }
}
