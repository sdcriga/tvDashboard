import { Component, Input, Output } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { BelowInfo } from '../_interface/belowinfo';

import { Events } from '../_interface/events';
import { DataSaveService } from '../_service/data-save.service';
import { EventColorService } from '../_service/event-color.service';
import { MidInfo } from '../_interface/midinfo';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss'],
})
export class ScreenViewComponent {
  eventSectionObject: Events[] | null = null;
  mainSectionObject: MidInfo[] | null = null;

 dataObject: BelowInfo[] | null = null;

  constructor(private sharedService: SharedService, public dataService: DataSaveService, public colorService: EventColorService) {}

  ngOnInit() {
    this.eventSectionObject = this.sharedService.getEventSectionData();
    this.dataService.getAndStoreBelowObject();
    this.dataService.getAndStoreEventObject();
    this.dataService.getAndStoreMainObject();
  }

  getColor(index: number): string {
    return this.colorService.getColor(index);
  }
}
