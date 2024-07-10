import { Component } from '@angular/core';
import { Events } from '../_interface/events';
import { News } from '../_interface/news';
import { BelowInfo } from '../_interface/belowinfo';
import { SharedService } from '../_service/shared.service';
import { DataSaveService } from '../_service/data-save.service';
import { EventColorService } from '../_service/event-color.service';

@Component({
  selector: 'app-new-screen-view',
  templateUrl: './new-screen-view.component.html',
  styleUrl: './new-screen-view.component.scss'
})
export class NewScreenViewComponent {

  eventSectionObject: Events[] | null = null;
  mainSectionObject: News[] | null = null;

 dataObject: BelowInfo[] | null = null;

  constructor(private sharedService: SharedService, public dataService: DataSaveService, public colorService: EventColorService) {}

  ngOnInit() {
    this.eventSectionObject = this.sharedService.getEventSectionData();
    this.dataService.getAndStoreBelowObject();
    this.dataService.getAndStoreEventObject();
    this.dataService.getAndStoreNewsObject();
  }

  getColor(index: number): string {
    return this.colorService.getColor(index);
  }

}
