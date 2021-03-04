import { TestBed } from '@angular/core/testing';

import { IDEServiceService } from './ideservice.service';

describe('IDEServiceService', () => {
  let service: IDEServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IDEServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
