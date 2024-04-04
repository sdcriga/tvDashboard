import { Component } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { Important } from '../_interface/important';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss'],
})
export class ScreenViewComponent {
  dataObject: Important | null = null;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    // this.sharedService.currentData.subscribe((data) => {
    //   this.dataObject = data;
    // });
    this.dataObject = this.sharedService.getData();
  }
}
