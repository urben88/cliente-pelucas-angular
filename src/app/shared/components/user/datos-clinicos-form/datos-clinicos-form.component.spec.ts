import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosClinicosFormComponent } from './datos-clinicos-form.component';

describe('DatosClinicosFormComponent', () => {
  let component: DatosClinicosFormComponent;
  let fixture: ComponentFixture<DatosClinicosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosClinicosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosClinicosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
