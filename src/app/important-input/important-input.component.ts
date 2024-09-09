import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataSaveService } from '../_service/data-save.service';
import { Important } from '../_interface/important';
import { FavouriteImportant } from '../_interface/favourite-important';
import { ImportantService } from '../_service/important.service';

@Component({
  selector: 'app-important-input',
  templateUrl: './important-input.component.html',
  styleUrls: ['./important-input.component.scss'],
})
export class ImportantInputComponent implements OnInit {
  dataObject: Important[] | null = null;
  favouritesDataObject: FavouriteImportant[] | null = null;
  currentInformationText = "Currently no information created";
  emptyDescriptionErrorMessage: string = "";
  editMode: boolean = false;
  isButtonExpanded = false;

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataSaveService,
    public importantService: ImportantService
  ) {}

  ngOnInit() {
    this.editMode = false;
    this.importantService.getAndStoreImportantObject();
    this.importantService.getAndStoreImportantObjectAsFavourite();
  }

  importantInputForm = this.formBuilder.group({
    description: ['', [Validators.required]],
  });

  onSubmit(): void {
    const belowInfo: Important = this.importantInputForm.value as Important;
    this.importantService.newImportant$(belowInfo).subscribe({
      next: (response) => {
        console.log('Important created successfully:', response);
      },
      error: (error) => {
        console.error('Failed to create Important:', error);
      }
    });
  }

  onSave(description: string, id: number): void {
    this.isButtonExpanded = true;
    setTimeout(() => this.isButtonExpanded= false, 200); 
    const important: Important = { description: description } as Important;
    this.importantService.saveImportantToFavourites$(important, id).subscribe({
      next: (response) => {
        console.log('Important created successfully:', response);
      },
      error: (error) => {
        console.error('Failed to create Important:', error);
      }
    });
  }

  onDelete(id: number): void {
    this.importantService.deleteImportant$(id).subscribe({
        next: (response) => {
            console.log('Important deleted successfully:', response);   
        },
        error: (error) => {
            console.error('Failed to delete Important:', error);
        }
    });
}

onFavouriteDelete(id: number): void {
  this.importantService.deleteFavouriteImportant$(id).subscribe({
      next: (response) => {
          console.log('Important deleted successfully:', response);   
      },
      error: (error) => {
          console.error('Failed to delete Important:', error);
      }
  });
}

onEdit(id: number, description: string): void {
  if (description.trim() === "") { 
    this.emptyDescriptionErrorMessage = "Description cannot be empty!";  
    return;
}
  this.importantService.updateImportant$(id, description).subscribe({
      next: (response) => {
          console.log('Information edited successfully:', response); 
          this.editMode = false;  
          this.emptyDescriptionErrorMessage = "";
      },
      error: (error) => {
          console.error('Failed to edit Information field:', error);
          this.emptyDescriptionErrorMessage = "Failed to update information."
      }
  });
}

goToEditIput(){
  this.editMode = true;
}

exitEditMode(){
  this.editMode = false;
}

}
