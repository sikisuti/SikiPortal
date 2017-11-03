import { Word } from '../../model/word';
import { Subject } from 'rxjs/Subject';

export interface TemplateComponent {
    word: Word;
    wordFinished: Subject<string>;
}
