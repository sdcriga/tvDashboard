import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isNewsInputVisible = false;
  isEventInputVisible = false;
  isImportantInputVisible = false;

  showNewsInput() {
    this.isNewsInputVisible = true;
    this.isEventInputVisible = false;
this.isImportantInputVisible = false;
  }

  showEventInput() {
    this.isEventInputVisible = true;
    this.isNewsInputVisible = false;
    this.isImportantInputVisible = false;
  }

  showImportantInput() {
    this.isImportantInputVisible = true;
    this.isNewsInputVisible = false;
    this.isEventInputVisible = false;
  }

}
