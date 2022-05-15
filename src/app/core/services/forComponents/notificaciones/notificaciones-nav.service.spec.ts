import { TestBed } from '@angular/core/testing';

import { NotificacionesNavService } from './notificaciones-nav.service';

describe('NotificacionesNavService', () => {
  let service: NotificacionesNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionesNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
