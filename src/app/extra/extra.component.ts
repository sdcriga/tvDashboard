import { Component } from '@angular/core';
import confetti from 'canvas-confetti';
import { ConfettiService } from '../_service/confetti.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.scss'
})
export class ExtraComponent {

  constructor(private confettiService: ConfettiService) {}

  celebrate() {
    this.confettiService.triggerConfetti(); 
  }

}
