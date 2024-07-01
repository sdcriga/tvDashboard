import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainInputComponent } from './main-input/main-input.component';
import { EventInputComponent } from './event-input/event-input.component';
import { ImportantInputComponent } from './important-input/important-input.component';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { NewScreenViewComponent } from './new-screen-view/new-screen-view.component';

const routes: Routes = [
  {
    path: 'screen',
    component: ScreenViewComponent,
  },
  {
    path: 'new-screen',
    component: NewScreenViewComponent,
  },
  {
    path: 'main',
    component: MainInputComponent,
  },
  {
    path: 'event',
    component: EventInputComponent,
  },
  {
    path: 'important',
    component: ImportantInputComponent,
  },
  { path: '', component: ScreenViewComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: ScreenViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
