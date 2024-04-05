import { Component } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { Important } from '../_interface/important';
import { Main } from '../_interface/main';
import { Events } from '../_interface/events';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss'],
})
export class ScreenViewComponent {
  importantSectionObject: Important | null = null;
  eventSectionObject: Events[] | null = null;
  mainSectionObject: Main | null = null;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.importantSectionObject = this.sharedService.getImportantSectionData();

    this.mainSectionObject = this.sharedService.getMainSectionData();

    this.eventSectionObject = this.sharedService.getEventSectionData();
  }
}
