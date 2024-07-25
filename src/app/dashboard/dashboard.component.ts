import { Component, Input } from '@angular/core';
import { News } from '../_interface/news';
import { NewsService } from '../_service/news.service';
import { Important } from '../_interface/important';
import { FavouriteNews } from '../_interface/favourite-news';
import { FavouriteImportant } from '../_interface/favourite-important';
import { ImportantService } from '../_service/important.service';
import { Events } from '../_interface/events';
import { FavouriteEvents } from '../_interface/favourite-events';
import { EventsService } from '../_service/events.service';
import { BehaviorSubject, Observable, catchError, map, of, startWith, throwError } from 'rxjs';
import { CustomHttpResponse } from '../_interface/customhttp';
import { Profile } from '../_interface/profile';
import { LoginService } from '../_service/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  profileState$: Observable<CustomHttpResponse<Profile>>;
  private loggedUserDataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
  newsDataObject: News[] | null = null;
  eventsDataObject: Events[] | null = null;
  importantDataObject: Important[] | null = null;
  newsFavouriteDataObject: FavouriteNews[] | null = null;
  eventsFavouriteDataObject: FavouriteEvents[] | null = null;
  importantFavouriteDataObject: FavouriteImportant[] | null = null;
  isNewsInputVisible = false;
  isEventInputVisible = false;
  isImportantInputVisible = false;
  isHistoryVisible = false;
  isFavouritesVisible = false;
  isImagesVisible = false;
  isExtraVisible = false;
  activeItem: string = '';

  constructor(
    private newsService: NewsService,
    private importantService: ImportantService,
    private eventsService: EventsService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.profileState$ = this.loginService.profile$().pipe(
      map((response) => {
        console.log(response + "user user user");
        this.loggedUserDataSubject.next(response);
        return response;
      }),
      catchError((error: string) => {
        console.error('Error fetching profile:', error);
        return throwError(() => error);
      })
    );
    this.loadNewsData();
    this.loadImportantData();
    this.loadEventsData();
    this.loadFavouriteNewsData();
    this.loadFavouriteImportantData();
    this.loadFavouriteEventsData();
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  loadNewsData() {
    this.newsService.getAllNews$().subscribe({
      next: (response) => {
        this.newsDataObject = response.data['news'];
        console.log('News data loaded:', this.newsDataObject);
      },
      error: (error) => {
        console.error('Failed to fetch news:', error);
      },
    });
  }

  loadImportantData() {
    this.importantService.getAllImportant$().subscribe({
      next: (response) => {
        this.importantDataObject = response.data['important'];
        console.log('Important data loaded:', this.importantDataObject);
      },
      error: (error) => {
        console.error('Failed to fetch important:', error);
      },
    });
  }

  loadEventsData() {
    this.eventsService.getAllEvents$().subscribe({
      next: (response) => {
        this.eventsDataObject = response.data['events'];
        console.log('Events data loaded:', this.eventsDataObject);
      },
      error: (error) => {
        console.error('Failed to fetch event:', error);
      },
    });
  }

  loadFavouriteNewsData() {
    this.newsService.getAllFavouriteNews$().subscribe({
      next: (response) => {
        this.newsFavouriteDataObject = response.data['favourites'];
        console.log('Favourited news data loaded:', this.newsFavouriteDataObject);
      },
      error: (error) => {
        console.error('Failed to fetch news:', error);
      },
    });
  }

  loadFavouriteImportantData() {
    this.importantService.getAllFavouriteImportant$().subscribe({
      next: (response) => {
        this.importantFavouriteDataObject = response.data['favourites'];
        console.log('Favourited important data loaded:', this.importantFavouriteDataObject);
      },
      error: (error) => {
        console.error('Failed to fetch favouroted important:', error);
      },
    });
  }

  loadFavouriteEventsData() {
    this.eventsService.getAllFavouriteEvents$().subscribe({
      next: (response) => {
        this.eventsFavouriteDataObject = response.data['favourites'];
        console.log('Favourited events data loaded:', this.eventsFavouriteDataObject);
      },
      error: (error) => {
        console.error('Failed to fetch favouroted events:', error);
      },
    });
  }

  private setVisibility(visibleElement: 'news' | 'event' | 'important' | 'history' | 'favourites' | 'extra' | 'images'): void {
    this.isNewsInputVisible = visibleElement === 'news';
    this.isEventInputVisible = visibleElement === 'event';
    this.isImportantInputVisible = visibleElement === 'important';
    this.isHistoryVisible = visibleElement === 'history';
    this.isFavouritesVisible = visibleElement === 'favourites';
    this.isExtraVisible = visibleElement === 'extra';
    this.isImagesVisible = visibleElement === 'images';
  }

  showNewsInput() {
    this.setVisibility('news');
  }
  
  showEventInput() {
    this.setVisibility('event');
  }
  
  showImportantInput() {
    this.setVisibility('important');
  }
  
  showHistory() {
    this.setVisibility('history');
  }
  
  showFavourites() {
    this.setVisibility('favourites');
  }
  
  showExtra() {
    this.setVisibility('extra');
  }
  
  showImages() {
    this.setVisibility('images');
  }
}
