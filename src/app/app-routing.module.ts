import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsInputComponent } from './news-input/news-input.component';
import { EventInputComponent } from './event-input/event-input.component';
import { ImportantInputComponent } from './important-input/important-input.component';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { NewScreenViewComponent } from './new-screen-view/new-screen-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: ScreenViewComponent },
  {
    path: 'screen',
    component: ScreenViewComponent,
  },
  {
    path: 'new-screen',
    component: NewScreenViewComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'news',
    component: NewsInputComponent,
  },
  {
    path: 'event',
    component: EventInputComponent,
  },
  {
    path: 'important',
    component: ImportantInputComponent,
  },

  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: ScreenViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
