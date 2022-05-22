import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNotificacionesComponent } from './form-notificaciones.component';

describe('FormNotificacionesComponent', () => {
  let component: FormNotificacionesComponent;
  let fixture: ComponentFixture<FormNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
