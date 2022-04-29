import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecRowTableComponent } from './selec-row-table.component';

describe('SelecRowTableComponent', () => {
  let component: SelecRowTableComponent;
  let fixture: ComponentFixture<SelecRowTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecRowTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecRowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
