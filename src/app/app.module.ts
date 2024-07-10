import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DndDirective } from './dnd.directive';
import { HttpClientModule } from '@angular/common/http';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { NewsInputComponent } from './news-input/news-input.component';
import { EventInputComponent } from './event-input/event-input.component';
import { ImportantInputComponent } from './important-input/important-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { ReversePipe } from './reverse.pipe';
import { SentenceCasePipe } from './sentence-case.pipe';
import { NewScreenViewComponent } from './new-screen-view/new-screen-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    MainScreenComponent,
    NewsInputComponent,
    EventInputComponent,
    ImportantInputComponent,
    NavbarComponent,
    ScreenViewComponent,
    NewScreenViewComponent,
    CalendarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ReversePipe,
    SentenceCasePipe
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
