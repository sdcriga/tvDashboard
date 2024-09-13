import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DndDirective } from './dnd.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewsInputComponent } from './news-input/news-input.component';
import { EventInputComponent } from './event-input/event-input.component';
import { ImportantInputComponent } from './important-input/important-input.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { ReversePipe } from './reverse.pipe';
import { SentenceCasePipe } from './sentence-case.pipe';
import { NewScreenViewComponent } from './new-screen-view/new-screen-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HistoryComponent} from './history/history.component';
import {FavouritesComponent} from './favourites/favourites.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImagesComponent } from './images/images.component';
import { ExtraComponent } from './extra/extra.component';
import { CopyLinkDirective } from './copy-link.directive';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { NgxCollapseAnimatedDirective } from 'ngx-collapse-animated';
import { SharedConfettiComponent } from './shared-confetti/shared-confetti.component';
import { HammerModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    CopyLinkDirective,
    NewsInputComponent,
    EventInputComponent,
    ImportantInputComponent,
    ScreenViewComponent,
    NewScreenViewComponent,
    CalendarComponent,
    DashboardComponent,
    HistoryComponent,
    FavouritesComponent,
    ImagesComponent,
    ExtraComponent,
    LoginComponent,
    SharedConfettiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ReversePipe,
    SentenceCasePipe,
    NgxCollapseAnimatedDirective,
    RouterOutlet,
    HammerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
