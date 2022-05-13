import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesRegaloCardComponent } from './cheques-regalo-card.component';

describe('ChequesRegaloCardComponent', () => {
  let component: ChequesRegaloCardComponent;
  let fixture: ComponentFixture<ChequesRegaloCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequesRegaloCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesRegaloCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
