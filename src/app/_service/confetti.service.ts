import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import confetti from 'canvas-confetti';

var scalar = 2;
var pineapple = confetti.shapeFromText({ text: '🍍', scalar });

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {

  // private confettiTrigger = new Subject<void>();
  private confettiTrigger = new BehaviorSubject<void>(null);

  confettiTriggered$ = this.confettiTrigger.asObservable();

  triggerConfetti() {
    // console.log("Triggering confeeeeetti");
    // this.confettiTrigger.next();

    console.log("Triggering confetti with emoji");

    // Customize the confetti to only show a smile emoji
    const emojiConfetti = confetti.create(undefined, {
      resize: true,
      useWorker: true,
    });

    emojiConfetti({
      particleCount: 1, // Only one smiley
      shapes: [pineapple],
      scalar
    });

    this.confettiTrigger.next();
  }
  }

