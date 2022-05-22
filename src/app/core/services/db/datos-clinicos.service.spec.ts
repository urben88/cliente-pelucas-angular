import { TestBed } from '@angular/core/testing';

import { DatosClinicosService } from './datos-clinicos.service';

describe('DatosClinicosService', () => {
  let service: DatosClinicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosClinicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
