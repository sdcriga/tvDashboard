import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Important } from 'src/_interface/important';
import { Main } from 'src/_interface/main';

@Component({
  selector: 'app-important-input',
  templateUrl: './important-input.component.html',
  styleUrls: ['./important-input.component.scss'],
})
export class ImportantInputComponent {
  dataObject: Important;

  constructor(private formBuilder: FormBuilder) {}

  importantInputForm = this.formBuilder.group({
    description: [''],
  });

  onSubmit(): void {
    this.dataObject = this.importantInputForm.value as Important;
    const formDataJson = JSON.stringify(this.importantInputForm.value);
    console.log(this.dataObject.description + 'data object');
    console.log(formDataJson + 'json');
  }
}
