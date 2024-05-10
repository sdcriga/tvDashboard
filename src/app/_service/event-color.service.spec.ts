import { TestBed } from '@angular/core/testing';

import { EventColorService } from './event-color.service';

describe('EventColorService', () => {
  let service: EventColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
