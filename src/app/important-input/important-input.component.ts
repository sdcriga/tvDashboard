import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataSaveService } from '../_service/data-save.service';
import { BelowInfo } from '../_interface/belowinfo';
import { SavedBelowInfo } from '../_interface/savedinfo';

@Component({
  selector: 'app-important-input',
  templateUrl: './important-input.component.html',
  styleUrls: ['./important-input.component.scss'],
})
export class ImportantInputComponent implements OnInit {
  dataObject: BelowInfo[] | null = null;
  favouritesDataObject: SavedBelowInfo[] | null = null;
  currentInformationText = "Currently no information created";
  emptyDescriptionErrorMessage: string = "";
  editMode: boolean = false;
  isButtonExpanded = false;

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataSaveService
  ) {}

  ngOnInit() {
    this.editMode = false;
    this.dataService.getAndStoreBelowObject();
    this.dataService.getAndStoreSavedBelowObject();
  }

  importantInputForm = this.formBuilder.group({
    description: [''],
  });

  onSubmit(): void {
    const belowInfo: BelowInfo = this.importantInputForm.value as BelowInfo;
    this.dataService.newImportant$(belowInfo).subscribe({
      next: (response) => {
        console.log('BelowInfo created successfully:', response);
      },
      error: (error) => {
        console.error('Failed to create BelowInfo:', error);
      }
    });
  }

  onSave(description: string, id: number): void {
    this.isButtonExpanded = true;
    setTimeout(() => this.isButtonExpanded= false, 200); 
    const belowInfo: BelowInfo = { description: description } as BelowInfo;
    this.dataService.saveImportant$(belowInfo, id).subscribe({
      next: (response) => {
        console.log('BelowInfo created successfully:', response);
      },
      error: (error) => {
        console.error('Failed to create BelowInfo:', error);
      }
    });
  }

  onDelete(id: number): void {
    this.dataService.deleteInformation$(id).subscribe({
        next: (response) => {
            console.log('BelowInfo deleted successfully:', response);   
        },
        error: (error) => {
            console.error('Failed to delete BelowInfo:', error);
        }
    });
}

onFavouriteDelete(id: number): void {
  this.dataService.deleteFavouriteInformation$(id).subscribe({
      next: (response) => {
          console.log('BelowInfo deleted successfully:', response);   
      },
      error: (error) => {
          console.error('Failed to delete BelowInfo:', error);
      }
  });
}

onEdit(id: number, description: string): void {
  if (description.trim() === "") { 
    this.emptyDescriptionErrorMessage = "Description cannot be empty!";  
    return;
}
  this.dataService.updateInformation$(id, description).subscribe({
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
