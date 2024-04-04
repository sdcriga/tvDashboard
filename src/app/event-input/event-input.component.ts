import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-input',
  templateUrl: './event-input.component.html',
  styleUrls: ['./event-input.component.scss'],
})
export class EventInputComponent {
  selectedFile: File;
  msg: string = '';
  image: any;
  file: File | null = null;

  constructor(private formBuilder: FormBuilder) {}

  eventInputForm = this.formBuilder.group({
    title: new FormControl(''),
    when: new FormControl(''),
    description: new FormControl(''),
    file: new FormControl(''),
  });

  onSubmit(): void {
    console.log(this.eventInputForm.value + 'test test');
    const formDataJson = JSON.stringify(this.eventInputForm.value);
    console.log(formDataJson, 'json');
  }

  onFileSelect(event: any) {
    if (this.file) {
      const formData = new FormData();

      formData.append('file', this.file, this.file.name);

      console.log(this.file + 'hgvdfhvshj');

      //const upload$ = this.http.post("https://httpbin.org/post", formData);
    }
    // this.selectedFile = event.target.files[0];
    // this.eventInputForm.patchValue({ file: this.selectedFile });
    // console.log(this.selectedFile, 'selected file');
    // // this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile + 'selected file');
    // const file = (event.target as HTMLInputElement).files[0];
    // this.eventInputForm.patchValue({ file: file });
  }
}
