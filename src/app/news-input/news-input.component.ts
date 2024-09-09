import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { News } from '../_interface/news';
import { NewsService } from '../_service/news.service';

@Component({
  selector: 'app-news-input',
  templateUrl: './news-input.component.html',
  styleUrls: ['./news-input.component.scss'],
})
export class NewsInputComponent implements OnInit {
  dataNewsObject: News | null = null;
  file: File | null = null;
  fileName = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public newsService: NewsService
  ) {}

  ngOnInit() {
    this.newsService.getAndStoreNewsObject();
  }

  newsInputForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    illustration: ['', [Validators.required]],
  });

  onSubmit(): void {
    const mainInfo: News = this.newsInputForm.value as News;
    this.newsService.newNews$(mainInfo).subscribe({
      next: (response) => {
        console.log('News created successfully:', response);
      },
      error: (error) => {
        console.error('Failed to create news:', error);
      },
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
