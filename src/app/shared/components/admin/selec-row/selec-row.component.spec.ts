import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecRowComponent } from './selec-row.component';

describe('SelecRowComponent', () => {
  let component: SelecRowComponent;
  let fixture: ComponentFixture<SelecRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
