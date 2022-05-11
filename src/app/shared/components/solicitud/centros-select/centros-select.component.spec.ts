import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosSelectComponent } from './centros-select.component';

describe('CentrosSelectComponent', () => {
  let component: CentrosSelectComponent;
  let fixture: ComponentFixture<CentrosSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentrosSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentrosSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
