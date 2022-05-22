import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesRegaloFormComponent } from './cheques-regalo-form.component';

describe('ChequesRegaloFormComponent', () => {
  let component: ChequesRegaloFormComponent;
  let fixture: ComponentFixture<ChequesRegaloFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequesRegaloFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesRegaloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
