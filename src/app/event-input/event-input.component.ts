import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_service/shared.service';
import { Events } from '../_interface/events';

@Component({
  selector: 'app-event-input',
  templateUrl: './event-input.component.html',
  styleUrls: ['./event-input.component.scss'],
})
export class EventInputComponent {
  dataObject: Events | null = null;
  selectedFile: File;
  msg: string = '';
  image: any;
  file: File | null = null;
  submittedForms: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {}

  eventInputForm = this.formBuilder.group({
    title: [''],
    when: [''],
    description: [''],
    // file: [''],
  });

  onSubmit(): void {
    this.dataObject = this.eventInputForm.value as Events;
    console.log(this.eventInputForm.value + 'test test');
    const formDataJson = JSON.stringify(this.eventInputForm.value);
    console.log(formDataJson, 'json');
    this.submittedForms.push(this.dataObject);
    this.sharedService.updateEventStorageData(this.dataObject);
    this.eventInputForm.reset();
  }

  // onFileSelect(event: any) {
  //   if (this.file) {
  //     const formData = new FormData();
  //     formData.append('file', this.file, this.file.name);
  //     console.log(this.file + 'this is file');
  //   }
  // }
}
