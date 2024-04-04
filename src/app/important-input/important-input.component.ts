import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Important } from 'src/app/_interface/important';
import { SharedService } from '../_service/shared.service';

@Component({
  selector: 'app-important-input',
  templateUrl: './important-input.component.html',
  styleUrls: ['./important-input.component.scss'],
})
export class ImportantInputComponent implements OnInit {
  dataObject: Important | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.dataObject = this.sharedService.getData();
  }

  importantInputForm = this.formBuilder.group({
    description: [''],
  });

  onSubmit(): void {
    this.dataObject = this.importantInputForm.value as Important;
    const formDataJson = JSON.stringify(this.importantInputForm.value);
    console.log(this.dataObject.description + 'data object');
    console.log(formDataJson + 'json');
    this.sharedService.updateStorageData(this.dataObject);
  }
}
