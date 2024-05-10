import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_service/shared.service';
import { HttpClient } from '@angular/common/http';
import { MidInfo } from '../_interface/midinfo';
import { DataSaveService } from '../_service/data-save.service';

@Component({
  selector: 'app-main-input',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.scss'],
})
export class MainInputComponent implements OnInit {
  dataMainObject: MidInfo | null = null;
  file: File | null = null;
  fileName = '';

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private http: HttpClient,
    public dataService: DataSaveService
  ) {}

  ngOnInit() {
   // this.dataMainObject = this.sharedService.getMainSectionData();
   this.dataService.getAndStoreMainObject();
  }

  mainInputForm = this.formBuilder.group({
    title: [''],
    when: [''],
    description: [''],
    illustration: ['']
    // file: [''],
  });

  onSubmit(): void {
    const mainInfo: MidInfo = this.mainInputForm.value as MidInfo;
    this.dataService.newMain$(mainInfo).subscribe({
      next: (response) => {
        console.log('MainInfo created successfully:', response);
      },
      error: (error) => {
        console.error('Failed to create MainInfo:', error);
      }
    });
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
