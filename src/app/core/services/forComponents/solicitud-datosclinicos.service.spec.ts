import { TestBed } from '@angular/core/testing';

import { SolicitudDatosclinicosService } from './solicitud-datosclinicos.service';

describe('SolicitudDatosclinicosService', () => {
  let service: SolicitudDatosclinicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudDatosclinicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
