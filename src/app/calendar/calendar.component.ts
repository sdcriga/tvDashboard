import { Component, EventEmitter, Output } from '@angular/core';
import { DataSaveService } from '../_service/data-save.service';
import { EventColorService } from '../_service/event-color.service';

const DAY_MS = 60 * 60 * 24 * 1000;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  dates: Array<Date>;
  eventDates: Date[] = [];
  days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  date = new Date();
  @Output() selected = new EventEmitter();

  constructor(private dataService: DataSaveService, public colorService: EventColorService) {
    this.dates = this.getCalendarDays();
    this.fetchEvents();
  }

  fetchEvents() {
    this.dataService.getAllEventInformation$().subscribe({
      next: response => {
        this.eventDates = response.data["events"].map(event => new Date(event.created_at));
        this.dates = this.getCalendarDays(); 
      },
      error: err => console.error('Failed to load events:', err)
    });
  }

  getEventColor(date: Date): string | null {
    const eventIndex = this.dataService.dataEventsObject?.findIndex(event =>
      new Date(event.event_date).toDateString() === date.toDateString()
    );
    return eventIndex !== -1 ? this.colorService.getColor(eventIndex) : null;
  }

  
  hasEvent(date: Date): boolean {
    return this.eventDates.some(eventDate =>
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  }

  setMonth(inc) {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    this.date = new Date(year, month + inc, 1);
    this.dates = this.getCalendarDays();
  }

  isSameMonth(date) {
    return date.getMonth() === this.date.getMonth();
  }

  private getCalendarDays() {
    const calendarStartTime = this.getCalendarStartDay().getTime();

    return this.range(0, 41).map(
      (num) => new Date(calendarStartTime + DAY_MS * num)
    );
  }

  private getCalendarStartDay() {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1, 7)
      .map((num) => new Date(firstDayOfMonth - DAY_MS * num + 7200000))
      .find((dt) => dt.getDay() === 0);
  }

  private range(start, end) {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  }

  isCurrentDate(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}
