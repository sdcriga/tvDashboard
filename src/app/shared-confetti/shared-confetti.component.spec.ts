import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedConfettiComponent } from './shared-confetti.component';

describe('SharedConfettiComponent', () => {
  let component: SharedConfettiComponent;
  let fixture: ComponentFixture<SharedConfettiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedConfettiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedConfettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
