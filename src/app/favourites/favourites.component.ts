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
  buttons = ['News', 'Events', 'Important'];
  selectedButton: string;
  currentInformationText = "No historical data";
  toggled: boolean = false;
  visible: boolean = true;

  constructor(public eventsService: EventsService, public newsService: NewsService, public importantService: ImportantService, public dataSaveService: DataSaveService, private cdr: ChangeDetectorRef) {
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
  }

  onSubmitNews(news: News): void {
    this.newsService.newNews$(news).subscribe({
      next: (response) => {
        console.log('News added successfully:', response);
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
