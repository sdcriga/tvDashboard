import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Main } from 'src/app/_interface/main';
import { SharedService } from '../_service/shared.service';

@Component({
  selector: 'app-main-input',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.scss'],
})
export class MainInputComponent {
  dataObject: Main;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {}

  mainInputForm = this.formBuilder.group({
    title: [''],
    when: [''],
    description: [''],
  });

  onSubmit(): void {
    this.dataObject = this.mainInputForm.value as Main;
    const formDataJson = JSON.stringify(this.mainInputForm.value);
    console.log(this.dataObject.description + 'data object');
    console.log(formDataJson + 'json');
  }
}
