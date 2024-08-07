import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_service/shared.service';
import { Events } from '../_interface/events';
import { DataSaveService } from '../_service/data-save.service';

@Component({
  selector: 'app-event-input',
  templateUrl: './event-input.component.html',
  styleUrls: ['./event-input.component.scss'],
})
export class EventInputComponent implements OnInit {
  dataEventsObject: Events[] | null = null;
  selectedFile: File;
  msg: string = '';
  image: any;
  file: File | null = null;
  submittedForms: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    public dataService: DataSaveService
  ) {}

  ngOnInit() {
    this.dataService.getAndStoreEventObject();
    
  }

  eventInputForm = this.formBuilder.group({
    title: [''],
    event_date: [''],
    time: [''],
    illustration: ['']
    // file: [''],
  });

  onSubmit(): void {
    const event: Events = this.eventInputForm.value as Events;
    this.dataService.newEvent$(event).subscribe({
      next: (response) => {
        console.log('Event created successfully:', response);
      },
      error: (error) => {
        console.error('Failed to create Event:', error);
      }
    });
  }

  // onFileSelect(event: any) {
  //   if (this.file) {
  //     const formData = new FormData();
  //     formData.append('file', this.file, this.file.name);
  //     console.log(this.file + 'this is file');
  //   }
  // }
}
