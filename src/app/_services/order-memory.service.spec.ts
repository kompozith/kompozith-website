import { TestBed } from '@angular/core/testing';

import { OrderMemoryService } from './order-memory.service';

describe('OrderMemoryService', () => {
  let service: OrderMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
