import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudSimpleShowComponent } from './solicitud-simple-show.component';

describe('SolicitudSimpleShowComponent', () => {
  let component: SolicitudSimpleShowComponent;
  let fixture: ComponentFixture<SolicitudSimpleShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudSimpleShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudSimpleShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
