import { TestBed } from '@angular/core/testing';

import { ChequesRegaloService } from './cheques-regalo.service';

describe('ChequesRegaloService', () => {
  let service: ChequesRegaloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChequesRegaloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
