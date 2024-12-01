import { TestBed } from '@angular/core/testing';

import { TeacherRequestService } from './teacher-request.service';

describe('TeacherRequestService', () => {
  let service: TeacherRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
