import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesRegaloComponent } from './cheques-regalo.component';

describe('ChequesRegaloComponent', () => {
  let component: ChequesRegaloComponent;
  let fixture: ComponentFixture<ChequesRegaloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequesRegaloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesRegaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
