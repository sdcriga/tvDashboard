import { Component, EventEmitter, Output } from '@angular/core';

const DAY_MS = 60 * 60 * 24 * 1000;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  dates: Array<Date>;
  days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  date = new Date();
  @Output() selected = new EventEmitter();

  constructor() {
    this.dates = this.getCalendarDays();
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
