import { TestBed } from '@angular/core/testing';

import { IntouchService } from './intouch.service';

describe('IntouchService', () => {
  let service: IntouchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntouchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
