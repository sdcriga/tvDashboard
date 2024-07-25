import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Important } from '../_interface/important';
import { Events } from '../_interface/events';
import { News } from '../_interface/news';


@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private importantDataSource = new BehaviorSubject<Important | null>(null);
  private mainDataSource = new BehaviorSubject<News | null>(null);
  private eventDataSource = new BehaviorSubject<Events[] | null>(null);

  sharedDataObject: Important[] | null = null;

  constructor() {}

  updateImportantData(data: Important) {
    this.importantDataSource.next(data);
  }
  updateMaintData(data: News) {
    this.mainDataSource.next(data);
  }
  updateEventData(data: Events[]) {
    this.eventDataSource.next(data);
  }

  updateImportantStorageData(data: Important) {
    localStorage.setItem('importantData', JSON.stringify(data));
  }
  updateMainStorageData(data: News) {
    localStorage.setItem('mainData', JSON.stringify(data));
  }
  updateEventStorageData(data: Events) {
    const existingData = localStorage.getItem('eventData');
    const eventDataArray = existingData
      ? (JSON.parse(existingData) as Events[])
      : [];
    eventDataArray.push(data);
    localStorage.setItem('eventData', JSON.stringify(eventDataArray));
  }

  getImportantSectionData(): Important | null {
    const data = localStorage.getItem('importantData');
    return data ? JSON.parse(data) : null;
  }
  getMainSectionData(): News | null {
    const data = localStorage.getItem('mainData');
    return data ? JSON.parse(data) : null;
  }
  getEventSectionData(): Events[] | null {
    const data = localStorage.getItem('eventData');
    return data ? JSON.parse(data) : null;
  }
}
