import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DndDirective } from './dnd.directive';
import { HttpClientModule } from '@angular/common/http';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { MainInputComponent } from './main-input/main-input.component';
import { EventInputComponent } from './event-input/event-input.component';
import { ImportantInputComponent } from './important-input/important-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    MainScreenComponent,
    MainInputComponent,
    EventInputComponent,
    ImportantInputComponent,
    NavbarComponent,
    ScreenViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
