import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesRegaloSelectComponent } from './cheques-regalo-select.component';

describe('ChequesRegaloSelectComponent', () => {
  let component: ChequesRegaloSelectComponent;
  let fixture: ComponentFixture<ChequesRegaloSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequesRegaloSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesRegaloSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
