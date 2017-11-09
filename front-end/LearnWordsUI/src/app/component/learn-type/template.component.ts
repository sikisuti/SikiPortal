import { Word } from '../../model/word';
import { Subject } from 'rxjs/Subject';

export interface TemplateComponent {
    wordFinished: Subject<string>;
    init(word: Word): void;
}
