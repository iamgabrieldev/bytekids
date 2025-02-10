import { TestBed } from '@angular/core/testing';

import { CertificationRequestService } from './certification-request.service';

describe('CertificationRequestService', () => {
  let service: CertificationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
