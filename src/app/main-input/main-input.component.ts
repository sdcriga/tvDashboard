import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Main } from 'src/_interface/main';

@Component({
  selector: 'app-main-input',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.scss'],
})
export class MainInputComponent {
  dataObject: Main;

  constructor(private formBuilder: FormBuilder) {}

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
