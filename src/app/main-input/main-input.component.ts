import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Main } from 'src/app/_interface/main';
import { SharedService } from '../_service/shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-input',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.scss'],
})
export class MainInputComponent implements OnInit {
  dataObject: Main | null = null;
  file: File | null = null;
  fileName = '';

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.dataObject = this.sharedService.getMainSectionData();
  }

  mainInputForm = this.formBuilder.group({
    title: [''],
    when: [''],
    description: [''],
    file: [''],
  });

  onSubmit(): void {
    this.dataObject = this.mainInputForm.value as unknown as Main;
    const formDataJson = JSON.stringify(this.mainInputForm.value);
    console.log(this.dataObject.description + 'data object');
    console.log(formDataJson + 'json');
    this.sharedService.updateMainStorageData(this.dataObject);
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('thumbnail', file);

      const upload$ = this.http.post('/api/thumbnail-upload', formData);

      upload$.subscribe();
    }
  }
}
