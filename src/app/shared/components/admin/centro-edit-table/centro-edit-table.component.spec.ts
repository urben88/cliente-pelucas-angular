import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroEditTableComponent } from './centro-edit-table.component';

describe('CentroEditTableComponent', () => {
  let component: CentroEditTableComponent;
  let fixture: ComponentFixture<CentroEditTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroEditTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroEditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
