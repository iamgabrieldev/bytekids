import { TestBed } from '@angular/core/testing';

import { WorkshopRequestService } from './workshop-request.service';

describe('WorkshopRequestService', () => {
  let service: WorkshopRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
