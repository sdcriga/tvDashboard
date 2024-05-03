import { Component, Input, Output } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { BelowInfo } from '../_interface/belowinfo';
import { Main } from '../_interface/main';
import { Events } from '../_interface/events';
import { DataSaveService } from '../_service/data-save.service';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss'],
})
export class ScreenViewComponent {
  eventSectionObject: Events[] | null = null;
  mainSectionObject: Main | null = null;

 dataObject: BelowInfo[] | null = null;

  constructor(private sharedService: SharedService, public dataService: DataSaveService) {}

  ngOnInit() {
    //local storage
    this.mainSectionObject = this.sharedService.getMainSectionData();
    this.eventSectionObject = this.sharedService.getEventSectionData();
    this.dataService.getAndStoreBelowObject();
  }

}
