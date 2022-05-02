import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosClinicosComponent } from './datos-clinicos.component';

describe('DatosClinicosComponent', () => {
  let component: DatosClinicosComponent;
  let fixture: ComponentFixture<DatosClinicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosClinicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
