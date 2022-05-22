import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNotificacionComponent } from './show-notificacion.component';

describe('ShowNotificacionComponent', () => {
  let component: ShowNotificacionComponent;
  let fixture: ComponentFixture<ShowNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowNotificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
