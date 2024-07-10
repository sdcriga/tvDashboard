import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_service/shared.service';
import { HttpClient } from '@angular/common/http';
import { News } from '../_interface/news';
import { DataSaveService } from '../_service/data-save.service';

@Component({
  selector: 'app-news-input',
  templateUrl: './news-input.component.html',
  styleUrls: ['./news-input.component.scss'],
})
export class NewsInputComponent implements OnInit {
  dataMainObject: News | null = null;
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
   this.dataService.getAndStoreNewsObject();
  }

  newsInputForm = this.formBuilder.group({
    title: [''],
    description: [''],
    illustration: ['']
    // file: [''],
  });

  onSubmit(): void {
    const mainInfo: News = this.newsInputForm.value as News;
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
