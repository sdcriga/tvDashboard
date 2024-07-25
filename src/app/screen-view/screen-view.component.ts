import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { Important } from '../_interface/important';

import { Events } from '../_interface/events';
import { DataSaveService } from '../_service/data-save.service';
import { EventColorService } from '../_service/event-color.service';
import { News } from '../_interface/news';

import { NewsService } from '../_service/news.service';
import { ImportantService } from '../_service/important.service';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss'],
})

export class ScreenViewComponent implements OnInit, OnDestroy{
  eventSectionObject: Events[] | null = null;
  mainSectionObject: News[] | null = null;
  dataObject: Important[] | null = null;
  date:Date;
  activeIndex: number = 0;
  intervalId: any;



  constructor(private sharedService: SharedService, public importantService: ImportantService, public dataService: DataSaveService, public newsService: NewsService, public colorService: EventColorService) {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  ngOnInit() {
    this.eventSectionObject = this.sharedService.getEventSectionData();
    this.importantService.getAndStoreImportantObject();
    this.dataService.getAndStoreEventObject();
    this.newsService.getAndStoreNewsObject();
    this.startAutoSlide();
  }


  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


    startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.newsService.dataNewsFilteredObject.length;
    }, 10000); 
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


