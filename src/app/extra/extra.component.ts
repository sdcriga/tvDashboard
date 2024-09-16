import { Component } from '@angular/core';
import { ConfettiService } from '../_service/confetti.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.scss'
})
export class ExtraComponent {
  isDarkBackground: boolean = false;
  private snowDuration = 15000; 

  constructor(private confettiService: ConfettiService) {}

  celebrate() {
    // this.confettiService.triggerConfetti(); 
    this.confettiService.triggerFireworkConfetti();
  }

  triggerSnow(){
    this.confettiService.triggerSnowConfetti();
    setTimeout(() => {
      this.isDarkBackground = true; 
    }, 1000); 
    setTimeout(() => {
      this.isDarkBackground = false;
    }, this.snowDuration);
  }
  }


