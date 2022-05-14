import { TestBed } from '@angular/core/testing';

import { SolicitudMedidasService } from './solicitud-medidas.service';

describe('SolicitudMedidasService', () => {
  let service: SolicitudMedidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudMedidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
