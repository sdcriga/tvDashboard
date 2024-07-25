import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { News } from '../_interface/news';
import { NewsService } from '../_service/news.service';
import { Important } from '../_interface/important';
import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';
import { DataSaveService } from '../_service/data-save.service';
import { ImportantService } from '../_service/important.service';
import { Events } from '../_interface/events';
import { EventsService } from '../_service/events.service';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('true', style({ height: '0' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ]),
    // trigger('rotatedState', [
    //   state('default', style({ transform: 'rotate(0)' })),
    //   state('rotated', style({ transform: 'rotate(-180deg)' })),
    //   transition('rotated => default', animate('400ms ease-out')),
    //   transition('default => rotated', animate('400ms ease-in'))
    // ])
    // trigger('collapse', [
    //   state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
    //   state('true', style({ height: '0', visibility: 'hidden' })),
    //   transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
    //   transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    // ])
  ]
})
export class HistoryComponent implements OnInit{
  dataObject: News[] | null = null;
  @Input() newsData: News[] | null = null;
  @Input() importantData: Important[] | null = null;
  @Input() eventsData: Events[] | null = null;
  buttons = ['News', 'Events', 'Important'];
  selectedButton: string;
  currentInformationText = "No historical data";
  toggled: boolean = false;
  // collapsed = false;


  constructor(public eventsService: EventsService, public newsService: NewsService, public importantService: ImportantService, public dataSaveService: DataSaveService, private cdr: ChangeDetectorRef) {
    this.selectedButton = 'News';
  }

  ngOnInit() {
    if (this.newsData) {
      this.newsData.forEach(news => {
        news.toggled = false;
        news.collapsed = true; 
      });
    }
    // this.cdr.detectChanges();
  }

  openEditForm(){
    
  }

  onNewsDeactivated(id: number): void {
    this.newsService.deactivateNews$(id).subscribe({
      next: (response) => {
        console.log('News deactivated:', response);
      },
      error: (error) => {
        console.error('Failed to deactivate news:', error);
      }
    });
  }

  onNewsActivated(id: number): void {
    this.newsService.activateNews$(id).subscribe({
      next: (response) => {
        console.log('News activated:', response);
      },
      error: (error) => {
        console.error('Failed to activate news:', error);
      }
    });
  }

  onImportantDeactivated(id: number): void {
    this.importantService.deactivateImportant$(id).subscribe({
      next: (response) => {
        console.log('Important deactivated:', response);
      },
      error: (error) => {
        console.error('Failed to deactivate important:', error);
      }
    });
  }

  onImportantActivated(id: number): void {
    this.importantService.activateImportant$(id).subscribe({
      next: (response) => {
        console.log('Important activated:', response);
      },
      error: (error) => {
        console.error('Failed to activate important:', error);
      }
    });
  }

  onEventDeactivated(id: number): void {
    this.eventsService.deactivateEvent$(id).subscribe({
      next: (response) => {
        console.log('Event deactivated:', response);
      },
      error: (error) => {
        console.error('Failed to deactivate event:', error);
      }
    });
  }

  onEventActivated(id: number): void {
    this.eventsService.activateEvent$(id).subscribe({
      next: (response) => {
        console.log('Event activated:', response);
      },
      error: (error) => {
        console.error('Failed to activate event:', error);
      }
    });
  }

  onImportantDelete(id: number): void {
    this.importantService.deleteImportant$(id).subscribe({
        next: (response) => {
            console.log('Important deleted successfully:', response);   
        },
        error: (error) => {
            console.error('Failed to delete important:', error);
        }
    });
}

onNewsDelete(id: number): void {
  this.newsService.deleteNews$(id).subscribe({
      next: (response) => {
          console.log('News deleted successfully:', response);   
      },
      error: (error) => {
          console.error('Failed to delete news:', error);
      }
  });
}

onEventDelete(id: number): void {
  this.eventsService.deleteEvent$(id).subscribe({
      next: (response) => {
          console.log('Event deleted successfully:', response);   
      },
      error: (error) => {
          console.error('Failed to delete event:', error);
      }
  });
}


  onImportantFavourited(description: string, id: number): void {
    const important: Important = { description: description } as Important;
    this.importantService.saveImportantToFavourites$(important, id).subscribe({
      next: (response) => {
        console.log('Important favourited:', response);
      },
      error: (error) => {
        console.error('Failed to favourite important:', error);
      }
    });
  }

  onNewsFavourited(description: string, title: string, illustration: string, active: boolean, id: number, event: Event): void {
    const news: News = { title: title, description: description, illustration: illustration } as News;
    this.newsService.saveNewsToFavourites$(news, id).subscribe({
      next: (response) => {
        console.log('News favourited:', response);
      },
      error: (error) => {
        console.error('Failed to favourite news:', error);
      }
    });
    const element = event.target as HTMLElement;
    if (element) {
      element.classList.add('clicked');
      setTimeout(() => element.classList.remove('clicked'), 700); 
    }
  }


  onEventFavourited(title: string, event_date: string, time: string, illustration:string, active: boolean, id: number): void {
    const event: Events = { title: title, event_date: event_date, time: time, illustration: illustration, active: active } as Events;
    this.eventsService.saveEventsToFavourites$(event, id).subscribe({
      next: (response) => {
        console.log('Event favourited:', response);
      },
      error: (error) => {
        console.error('Failed to favourite event:', error);
      }
    });
  }


onFavouriteImportantDelete(id: number): void {
  this.importantService.deleteFavouriteImportant$(id).subscribe({
      next: (response) => {
          console.log('Important unfavourited successfully:', response);   
      },
      error: (error) => {
          console.error('Failed to unfavourite important:', error);
      }
  });
}

onFavouriteNewsDelete(id: number): void {
  this.newsService.deleteFavouriteNews$(id).subscribe({
      next: (response) => {
          console.log('News unfavourited successfully:', response);   
      },
      error: (error) => {
          console.error('Failed to unfavourite news:', error);
      }
  });
}

onFavouriteEventDelete(id: number): void {
  this.eventsService.deleteFavouriteEvent$(id).subscribe({
      next: (response) => {
          console.log('Event unfavourited successfully:', response);   
      },
      error: (error) => {
          console.error('Failed to unfavourite event:', error);
      }
  });
}

onNewsFavouriteAction(description: string, title: string, illustration: string, active: boolean, id: number, event: Event, favourite: boolean): void {
  if (favourite) {
    this.onFavouriteNewsDelete(id);
  } else {
    this.onNewsFavourited(description, title, illustration, active, id, event);
  }
}

onEventsFavouriteAction(title: string, event_date: string, time: string, illustration: string,  active: boolean, favourite: boolean, id: number): void {
  if (favourite) {
    this.onFavouriteEventDelete(id);
  } else {
    this.onEventFavourited(title, event_date, time, illustration, active, id);
  }
}

  toggleIcon(news: News) {
    news.toggled = !news.toggled;
    news.collapsed = !news.collapsed; 
  }



  // toggleIconDown(news: News) {
  //   news.toggled = !news.toggled;
  //   this.collapsed = false;
  // }

  // toggleIconUp(news: News) {
  //   news.toggled = !news.toggled;
  //   this.collapsed = true;
  // }


  selectButton(button: string) {
    this.selectedButton = button;
  }

}
