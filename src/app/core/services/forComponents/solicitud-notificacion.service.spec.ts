import { TestBed } from '@angular/core/testing';

import { SolicitudNotificacionService } from './solicitud-notificacion.service';

describe('SolicitudNotificacionService', () => {
  let service: SolicitudNotificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudNotificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
