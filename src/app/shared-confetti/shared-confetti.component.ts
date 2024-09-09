import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfettiService } from '../_service/confetti.service';
import confetti from 'canvas-confetti';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-confetti',
  template: `<div></div>`,
})
export class SharedConfettiComponent implements OnInit {

  constructor(private confettiService: ConfettiService,  private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to confetti trigger from the service
    this.confettiService.confettiTriggered$.subscribe(() => {
      console.log("Confetti subscription received trigger");
      // this.cdr.detectChanges();
      this.launchConfetti();
    });
  }

  launchConfetti() {

    const duration = 3000; // in milliseconds

    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
      zIndex: 1000, // Make sure confetti is rendered above all other elements
    });

    setTimeout(() => confetti.reset(), duration);

    // this.router.navigateByUrl("/");
  }
}
