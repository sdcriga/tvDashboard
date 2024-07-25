import { Component } from '@angular/core';
import { Events } from '../_interface/events';
import { News } from '../_interface/news';
import { Important} from '../_interface/important';
import { SharedService } from '../_service/shared.service';
import { DataSaveService } from '../_service/data-save.service';
import { EventColorService } from '../_service/event-color.service';
import { NewsService } from '../_service/news.service';
import { ImportantService } from '../_service/important.service';

@Component({
  selector: 'app-new-screen-view',
  templateUrl: './new-screen-view.component.html',
  styleUrl: './new-screen-view.component.scss'
})
export class NewScreenViewComponent {

  eventSectionObject: Events[] | null = null;
  mainSectionObject: News[] | null = null;

 dataObject: Important[] | null = null;

  constructor(private sharedService: SharedService, public importantService: ImportantService, public dataService: DataSaveService, public newsService: NewsService, public colorService: EventColorService) {}

  ngOnInit() {
    this.eventSectionObject = this.sharedService.getEventSectionData();
    this.importantService.getAndStoreImportantObject();
    this.dataService.getAndStoreEventObject();
    this.newsService.getAndStoreNewsObject();
  }

  getColor(index: number): string {
    return this.colorService.getColor(index);
  }

}
