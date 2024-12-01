import { TestBed } from '@angular/core/testing';

import { StudentRequestService } from './student-request.service';

describe('StudentRequestService', () => {
  let service: StudentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
