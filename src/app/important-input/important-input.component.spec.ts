import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantInputComponent } from './important-input.component';

describe('ImportantInputComponent', () => {
  let component: ImportantInputComponent;
  let fixture: ComponentFixture<ImportantInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportantInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportantInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
