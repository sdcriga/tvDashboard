import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import confetti from 'canvas-confetti';

var scalar = 2;
var pineapple = confetti.shapeFromText({ text: '🤩', scalar });

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {
  private emojis = ['👍', '🎉', '🥳', '🎊', '🌟', '✨', '👏', '🚀', '💥', '🔥'];

  // private confettiTrigger = new Subject<void>();
  private confettiTrigger = new BehaviorSubject<void>(null);

  confettiTriggered$ = this.confettiTrigger.asObservable();

  triggerEventsConfetti() {
    console.log("Triggering confetti with emojis");

    const emojiConfetti = confetti.create(undefined, {
      resize: true,
      useWorker: true,
    });

    this.launchEmojiConfetti(emojiConfetti, 10);

    this.confettiTrigger.next();
  }

  private launchEmojiConfetti(confettiInstance: any, count: number) {
    const duration = 3000; 

    for (let i = 0; i < count; i++) {
      const emoji = this.getRandomEmoji();
      const shape = confetti.shapeFromText({ text: emoji, scalar: 2 });

      confettiInstance({
        particleCount: 1,
        shapes: [shape],
        scalar: 1,
        spread: 30, 
        origin: { y: Math.random() }, 
      });
    }

    setTimeout(() => confettiInstance.reset(), duration);
  }

  private getRandomEmoji(): string {
    const randomIndex = Math.floor(Math.random() * this.emojis.length);
    return this.emojis[randomIndex];
  }


  triggerConfetti() {
    // console.log("Triggering confeeeeetti");
    // this.confettiTrigger.next();

    console.log("Triggering confetti with emoji");

    const emojiConfetti = confetti.create(undefined, {
      resize: true,
      useWorker: true,
    });

    emojiConfetti({
      particleCount: 50, 
      shapes: [pineapple],
      scalar
    });

    this.confettiTrigger.next();
  }


  triggerFireworkConfetti() {

    const duration = 10 * 1000; // 15 seconds duration
    const animationEnd = Date.now() + duration;

    const defaults = {
      startVelocity: 30, // Initial velocity of the particles
      spread: 360,       // Spread in degrees (360 means all directions)
      ticks: 60,         // Number of ticks for the animation
      zIndex: 1000       // Z-index to ensure it's above other elements
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration); // Decrease particle count over time

      // Create confetti bursts from two different locations on the screen
      this.fireConfettiBurst(particleCount, defaults, { x: this.randomInRange(0.1, 0.3), y: Math.random() - 0.2 });
      this.fireConfettiBurst(particleCount, defaults, { x: this.randomInRange(0.7, 0.9), y: Math.random() - 0.2 });
      
    }, 250); // Fire a burst every 250 milliseconds

    // Notify subscribers
    this.confettiTrigger.next();
  }

  private fireConfettiBurst(particleCount: number, defaults: any, origin: { x: number, y: number }) {
    confetti({
      ...defaults,
      particleCount,
      origin,  // Where the confetti burst starts from
    });
  }

  private randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }


  triggerSnowConfetti() {
    console.log("Triggering snow-like confetti");

    const duration = 10 * 1000; // Snow effect for 10 seconds
    const animationEnd = Date.now() + duration;
    let skew = 1; // Initial skew factor

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration)); // Adjust tick duration over time
      skew = Math.max(0.8, skew - 0.001); // Slowly reduce skew

      confetti({
        particleCount: 1, // Only 1 particle at a time for the snow effect
        startVelocity: 0, // Start slowly, resembling snow
        ticks: ticks,     // Make particles stay on screen for longer
        origin: {
          x: Math.random(),              // Random horizontal position
          y: (Math.random() * skew) - 0.2 // Start particles towards the top
        },
        colors: ['#ffffff'], // Snow color: white
        shapes: ['circle'],  // Shape of the particles: circle
        gravity: randomInRange(0.4, 0.6), // Gravity to make particles fall slowly
        scalar: randomInRange(0.4, 1),    // Random sizes for snowflakes
        drift: randomInRange(-0.4, 0.4)   // Drift to simulate wind
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame); // Keep the animation running until the duration ends
      }
    };

    // Start the snow effect
    frame();

    // Notify subscribers
    this.confettiTrigger.next();
  }
}
  

