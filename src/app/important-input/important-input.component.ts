import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Important } from '../_interface/important';
import { SharedService } from '../_service/shared.service';
import { DataSaveService } from '../_service/data-save.service';

@Component({
  selector: 'app-important-input',
  templateUrl: './important-input.component.html',
  styleUrls: ['./important-input.component.scss'],
})
export class ImportantInputComponent implements OnInit {
  dataObject: Important | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private dataService: DataSaveService
  ) {}

  ngOnInit() {
    this.dataObject = this.sharedService.getImportantSectionData();
  }

  importantInputForm = this.formBuilder.group({
    description: [''],
  });

  onSubmit(): void {
    const belowInfo: Important = this.importantInputForm.value as Important;
    this.dataService.newImportant$(belowInfo).subscribe({
      next: (response) => {
        console.log('BelowInfo created successfully:', response);
        this.sharedService.updateImportantStorageData(response.data['belowInfo'] as Important);
      },
      error: (error) => {
        console.error('Failed to create BelowInfo:', error);
      }
    });
  }


}
