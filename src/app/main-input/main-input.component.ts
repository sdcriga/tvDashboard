import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Main } from 'src/_interface/main';

@Component({
  selector: 'app-main-input',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.scss'],
})
export class MainInputComponent {
  dataObejct: Main;
  when: String = '';

  constructor(private formBuilder: FormBuilder) {}

  mainInputForm = this.formBuilder.group({
    title: [''],
    when: [''],
    description: [''],
  });

  // mainInputForm = this.formBuilder.group({
  //   main: [
  //     {
  //       title: [''],
  //       when: [''],
  //       description: [''],
  //     },
  //   ],
  // });

  // mainObject = new FormGroup({
  //   name: new FormControl(''),
  //   main: new FormArray([
  //     new FormGroup({
  //       title: new FormControl(''),
  //       when: new FormControl(''),
  //       description: new FormControl(''),
  //     }),
  //   ]),
  // });

  // onSubmit() {
  //   return (<FormArray>this.mainObject.get('main')).controls;
  // }

  onSubmit(): void {
    const formDataJson = JSON.stringify(this.mainInputForm.value);
    console.log(formDataJson + 'json');
  }
}
