import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { Important } from '../_interface/important';

import { Events } from '../_interface/events';
import { DataSaveService } from '../_service/data-save.service';
import { EventColorService } from '../_service/event-color.service';
import { News } from '../_interface/news';

import { NewsService } from '../_service/news.service';
import { ImportantService } from '../_service/important.service';
import { interval, Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { EventsService } from '../_service/events.service';
import { trigger, transition, style, animate, group } from '@angular/animations';
import { ConfettiService } from '../_service/confetti.service';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss'],
  animations: [
    trigger('fadeInOut', [
      // new event enters
      transition(':enter', [
        style({ opacity: 0.4, transform: 'translateY(-5px)' }), 
        group([
          animate('700ms ease-in', style({ opacity: 0.5, transform: 'translateY(-5px)' })),
          animate('1000ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))  
        ])
      ]),
    ]),
    trigger('moveDown', [
      // existing events move down
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0 }), 
        animate('500ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 })) 
      ])
    ]),
    trigger('fadeSlide', [
      // news enters
      transition(':enter', [
        style({ opacity: 0, visibility: 'hidden' }),
     //    animate('400ms ease-in', style({ opacity: 1, transform: 'translateX(0)', visibility: 'visible' }))
     group([
      animate('300ms ease-in', style({ opacity: 0.2, transform: 'translateX(0)', visibility: 'visible'  })), 
      animate('500ms ease-in', style({ opacity: 0.6, transform: 'translateX(0)', visibility: 'visible'  })), 
      animate('800ms ease-in', style({  opacity: 1, transform: 'translateX(0)', visibility: 'visible'  })) 
    ])
      ]),
      // news leaves
      transition(':leave', [
         animate('500ms ease-in', style({ opacity: 0, transform: 'translateX(-13px)', visibility: 'hidden' }))
      ])
    ])
  ]
})

export class ScreenViewComponent implements OnInit, OnDestroy{
  eventSectionObject: Events[] | null = null;
  mainSectionObject: News[] | null = null;
  dataObject: Important[] | null = null;
  displayedEvents: Events[] = []; 
  rotationInterval: any;
  date:Date;
  currentIndex = 0;
  maxVisibleItems = 3;
  activeIndex: number = 0;
  intervalId: any;
  eventSubscription: Subscription;
  isContentVisible = true;
  dataNewsFilteredObject: News[] = [];


  constructor(private sharedService: SharedService, public importantService: ImportantService, public dataService: DataSaveService, public newsService: NewsService, public eventsService: EventsService, public colorService: EventColorService, private confettiService: ConfettiService) {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
   
  }

  ngOnInit() {
    this.importantService.getAndStoreImportantObject();
    this.dataService.getAndStoreEventObject();
    this.newsService.getAndStoreNewsObject();
    this.startAutoSlide();
    this.loadEvents();

    // this.confettiService.confettiTriggered$.subscribe(() => {
    //   console.log('Confetti triggered in ScreenViewComponent');
    // });
    // const source = interval(1000);
    // const subscribe = source.subscribe(val => console.log(val));
    // console.log(subscribe + "timer timer");

    this.newsService.news$.subscribe(news => {
      this.dataNewsFilteredObject = news;
    });

    this.newsService.getAndStoreNewsObject();
  }

  ngOnDestroy(): void {
    // if (this.intervalId) {
    //   clearInterval(this.intervalId);
    // }
    clearInterval(this.intervalId); 
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

    loadEvents(): void {
      this.eventSubscription = this.eventsService.getAllEvents$().subscribe({
      next: (response) => {
        this.eventSectionObject = response.data ? response.data['events'] : [];
        this.handleEventsDisplay();
      },
      error: (error) => {
        console.error('Failed to fetch events:', error);
      },
    });
  }

  handleEventsDisplay(): void {
    if (this.eventSectionObject && this.eventSectionObject.length > 3) {
      this.displayedEvents = this.eventSectionObject.slice(0, 3);

      this.rotationInterval = setInterval(() => {
        this.rotateEvents();
      }, 20000);
    } else if (this.eventSectionObject) {
      this.displayedEvents = this.eventSectionObject;
    }
  }

  rotateEvents(): void {
    if (this.eventSectionObject && this.eventSectionObject.length > 3) {
      const lastEvent = this.eventSectionObject.pop();
      if (lastEvent) {
        this.eventSectionObject.unshift(lastEvent);
      }
      this.displayedEvents = this.eventSectionObject.slice(0, 3);
    }
  }

    startAutoSlide(): void {
      this.intervalId = setInterval(() => {
        this.isContentVisible = false;
  
        setTimeout(() => {
          if (this.newsService.dataNewsFilteredObject && this.newsService.dataNewsFilteredObject.length > 0) {
            this.activeIndex = (this.activeIndex + 1) % this.newsService.dataNewsFilteredObject.length;
          }
          this.isContentVisible = true;
        }, 600); 
      }, 50000); 
  }

  onIconLeft() {
    if (this.activeIndex < this.dataNewsFilteredObject.length - 1) {
      this.activeIndex++;
    }
  }
  
  onIconRight() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  onSwipeLeft() {
    if (this.activeIndex < this.dataNewsFilteredObject.length - 1) {
      this.activeIndex++;
    }
  }
  
  onSwipeRight() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  // ngAfterViewInit(): void {
  //   const marquees = document.querySelectorAll('.marquee');

  //   marquees.forEach(marquee => {
  //     this.initializeMarquee(marquee as HTMLElement);
  //   });
  // }

  // private initializeMarquee(marquee: HTMLElement): void {
  //   let totalWidth = 0;
  //   const items = marquee.querySelectorAll('.marquee-item');
  //   const direction = marquee.dataset['scrollDirection'] === "right" ? -1 : 1;

  //   gsap.set(items, {
  //     x: (i: number, target: HTMLElement) => {
  //       const width = target.offsetWidth;
  //       const x = totalWidth;
  //       totalWidth += width;
  //       return x;
  //     }
  //   });

  //   const speed = marquee.dataset['scrollSpeed'] ? parseFloat(marquee.dataset['scrollSpeed']) : 2;

  //   gsap.to(items, {
  //     duration: speed,
  //     ease: "none",
  //     x: `+=${totalWidth * direction}`,
  //     modifiers: {
  //       x: gsap.utils.unitize((x: number) => parseFloat(x.toString()) % totalWidth)
  //     },
  //     repeat: -1
  //   });
  // }

  getColor(index: number): string {
    return this.colorService.getColor(index);
  }
}


