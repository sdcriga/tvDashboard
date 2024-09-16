import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { News } from '../_interface/news';
import { DataSaveService } from '../_service/data-save.service';
import { NewsService } from '../_service/news.service';
import { FavouriteNews } from '../_interface/favourite-news';
import { FavouriteImportant } from '../_interface/favourite-important';
import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { ImportantService } from '../_service/important.service';
import { FavouriteEvents } from '../_interface/favourite-events';
import { EventsService } from '../_service/events.service';
import { Events } from '../_interface/events';
import { Important } from '../_interface/important';
import { ConfettiService } from '../_service/confetti.service';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('true', style({ height: '0' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ]),
  ]
})
export class FavouritesComponent {
  dataObject: News[] | null = null;
  @Input() newsFavouriteData: FavouriteNews[] | null = null;
  @Input() eventsFavouriteData: FavouriteEvents[] | null = null;
  @Input() importantFavouriteData: FavouriteImportant[] | null = null;
  favouriteImportantItems: FavouriteImportant[] = [];
  favouriteEventsItems: FavouriteEvents [] = [];
  favouriteNewsItems: FavouriteNews[] = [];
  buttons = ['News', 'Events', 'Important'];
  selectedButton: string;
  currentInformationText = "No historical data";
  toggled: boolean = false;
  visible: boolean = true;
  formSubmittedSuccessfully = false;
  showSuccessMessage = false;

  constructor(private confettiService: ConfettiService, public eventsService: EventsService, public newsService: NewsService, public importantService: ImportantService, public dataSaveService: DataSaveService, private cdr: ChangeDetectorRef) {
    this.selectedButton = 'News';
  }

  ngOnInit() {
    if (this.newsFavouriteData) {
      this.newsFavouriteData.forEach(news => {
        news.toggled = false;
        news.collapsed = true; 
        this.visible = true;
      });
    }
    this.loadFavouriteImportantItems();
    this.loadFavouriteEventsItems();
    this.loadFavouriteNewsItems();
  }

  celebrate() {
    this.confettiService.triggerEventsConfetti(); 
  }

  loadFavouriteImportantItems(): void {
    this.importantService.getAllFavouriteImportant$().subscribe({
      next: (response) => {
        this.favouriteImportantItems = response.data?.['favourites'] || []; 
      },
      error: (error) => {
        console.error('Failed to load important items:', error);
      }
    });
  }

  loadFavouriteEventsItems(): void {
    this.eventsService.getAllFavouriteEvents$().subscribe({
      next: (response) => {
        this.favouriteEventsItems = response.data?.['favourites'] || []; 
      },
      error: (error) => {
        console.error('Failed to load event items:', error);
      }
    });
  }

  loadFavouriteNewsItems(): void {
    this.newsService.getAllFavouriteNews$().subscribe({
      next: (response) => {
        this.favouriteNewsItems = response.data?.['favourites'] || []; 
      },
      error: (error) => {
        console.error('Failed to load news items:', error);
      }
    });
  }

  onSubmitNews(news: News): void {
    this.newsService.newNews$(news).subscribe({
      next: (response) => {
        console.log('News added successfully:', response);
        const index = this.favouriteNewsItems.findIndex(item => item.id === news.id);
        if (index !== -1) {
          this.favouriteNewsItems[index].showSuccess = true;

          setTimeout(() => {
            this.favouriteNewsItems[index].fadeOut = true;
            setTimeout(() => {
              this.favouriteNewsItems[index].showSuccess = false;
              this.favouriteNewsItems[index].fadeOut = false;
            }, 700); 
          }, 3000); 
        }
      },
      error: (error) => {
        console.error('Failed to add news:', error);
      },
    });
  }

  onSubmitEvent(event: Events): void {
    this.eventsService.newEvent$(event).subscribe({
      next: (response) => {
        console.log('Event added successfully:', response);
        const index = this.favouriteEventsItems.findIndex(item => item.id === event.id);
        if (index !== -1) {
          this.favouriteEventsItems[index].showSuccess = true;

          setTimeout(() => {
            this.favouriteEventsItems[index].fadeOut = true;
            setTimeout(() => {
              this.favouriteEventsItems[index].showSuccess = false;
              this.favouriteEventsItems[index].fadeOut = false;
            }, 700); 
          }, 3000); 
        }
      },
      error: (error) => {
        console.error('Failed to add event:', error);
      },
    });
  }

  onSubmitImportant(important: Important): void {
    this.importantService.newImportant$(important).subscribe({
      next: (response) => {
        console.log('Important added successfully:', response);
        const index = this.favouriteImportantItems.findIndex(item => item.id === important.id);
        if (index !== -1) {
          this.favouriteImportantItems[index].showSuccess = true;

          setTimeout(() => {
            this.favouriteImportantItems[index].fadeOut = true;
            setTimeout(() => {
              this.favouriteImportantItems[index].showSuccess = false;
              this.favouriteImportantItems[index].fadeOut = false;
            }, 700); 
          }, 3000); 
        }
      },
      error: (error) => {
        console.error('Failed to add important:', error);
      },
    });
  }

  onImportantDelete(id: number): void {
    this.importantService.deleteFavouriteImportant$(id).subscribe({
        next: (response) => {
            console.log('Important deleted successfully:', response);  
            this.favouriteImportantItems = this.favouriteImportantItems.filter(item => item.importantId !== id);   
        },
        error: (error) => {
            console.error('Failed to delete important:', error);
        }
    });
}

onNewsDelete(id: number): void {
  this.newsService.deleteFavouriteNews$(id).subscribe({
      next: (response) => {
          console.log('News deleted successfully:', response);   
          this.favouriteNewsItems = this.favouriteNewsItems.filter(item => item.newsId !== id);  
      },
      error: (error) => {
          console.error('Failed to delete news:', error);
      }
  });
}

onEventDelete(id: number): void {
  this.eventsService.deleteFavouriteEvent$(id).subscribe({
      next: (response) => {
          console.log('Event deleted successfully:', response);   
          this.favouriteEventsItems = this.favouriteEventsItems.filter(item => item.eventId !== id);  
      },
      error: (error) => {
          console.error('Failed to delete event:', error);
      }
  });
}

  toggleIcon(news: News) {
    news.toggled = !news.toggled;
    news.collapsed = !news.collapsed; 
  }

  selectButton(button: string) {
    this.selectedButton = button;
  }
}
