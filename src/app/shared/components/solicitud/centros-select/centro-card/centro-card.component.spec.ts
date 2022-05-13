import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCardComponent } from './centro-card.component';

describe('CentroCardComponent', () => {
  let component: CentroCardComponent;
  let fixture: ComponentFixture<CentroCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
