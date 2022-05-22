import { TestBed } from '@angular/core/testing';

import { SetSolicitudesService } from './set-solicitudes.service';

describe('SetSolicitudesService', () => {
  let service: SetSolicitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetSolicitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
