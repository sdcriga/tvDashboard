import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScreenViewComponent } from './new-screen-view.component';

describe('NewScreenViewComponent', () => {
  let component: NewScreenViewComponent;
  let fixture: ComponentFixture<NewScreenViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewScreenViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewScreenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
