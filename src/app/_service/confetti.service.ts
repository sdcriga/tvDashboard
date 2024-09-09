import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {

  // private confettiTrigger = new Subject<void>();
  private confettiTrigger = new BehaviorSubject<void>(null);

  confettiTriggered$ = this.confettiTrigger.asObservable();

  triggerConfetti() {
    console.log("Triggering confeeeeetti");
    this.confettiTrigger.next();
  }
}
