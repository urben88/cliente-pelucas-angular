import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNotificacionesComponent } from './show-notificaciones.component';

describe('ShowNotificacionesComponent', () => {
  let component: ShowNotificacionesComponent;
  let fixture: ComponentFixture<ShowNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowNotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
