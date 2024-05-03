import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BelowInfo } from '../_interface/belowinfo';
import { Main } from '../_interface/main';
import { Events } from '../_interface/events';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private importantDataSource = new BehaviorSubject<BelowInfo | null>(null);
  private mainDataSource = new BehaviorSubject<Main | null>(null);
  private eventDataSource = new BehaviorSubject<Events[] | null>(null);

  sharedDataObject: BelowInfo[] | null = null;

  constructor() {}

  updateImportantData(data: BelowInfo) {
    this.importantDataSource.next(data);
  }
  updateMaintData(data: Main) {
    this.mainDataSource.next(data);
  }
  updateEventData(data: Events[]) {
    this.eventDataSource.next(data);
  }

  updateImportantStorageData(data: BelowInfo) {
    localStorage.setItem('importantData', JSON.stringify(data));
  }
  updateMainStorageData(data: Main) {
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

  getImportantSectionData(): BelowInfo | null {
    const data = localStorage.getItem('importantData');
    return data ? JSON.parse(data) : null;
  }
  getMainSectionData(): Main | null {
    const data = localStorage.getItem('mainData');
    return data ? JSON.parse(data) : null;
  }
  getEventSectionData(): Events[] | null {
    const data = localStorage.getItem('eventData');
    return data ? JSON.parse(data) : null;
  }
}
