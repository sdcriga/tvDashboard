import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Important } from '../_interface/important';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private dataSource = new BehaviorSubject<Important | null>(null);
  currentData = this.dataSource.asObservable();

  updateData(data: Important) {
    this.dataSource.next(data);
  }

  updateStorageData(data: Important) {
    localStorage.setItem('importantData', JSON.stringify(data));
  }

  getData(): Important | null {
    const data = localStorage.getItem('importantData');
    return data ? JSON.parse(data) : null;
  }
}
