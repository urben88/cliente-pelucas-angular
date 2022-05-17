import { TestBed } from '@angular/core/testing';

import { FechasUtilService } from './fechas-util.service';

describe('FechasUtilService', () => {
  let service: FechasUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechasUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
