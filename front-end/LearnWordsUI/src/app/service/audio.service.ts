import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable()
export class AudioService {

  private sounds = [];

  constructor() { }

  play(audioURL: string) {
    console.log(audioURL);
    if (audioURL === undefined || audioURL === 'n/a') { return; }
    const sound = this.sounds.find(s => s._src === audioURL);
    if (sound === undefined) {
      this.sounds.push(new Howl({ src: [audioURL], autoplay: true }));
    } else {
      sound.play();
    }
  }
}
