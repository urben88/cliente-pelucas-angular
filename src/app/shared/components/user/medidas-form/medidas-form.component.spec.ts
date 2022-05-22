import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasFormComponent } from './medidas-form.component';

describe('MedidasFormComponent', () => {
  let component: MedidasFormComponent;
  let fixture: ComponentFixture<MedidasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedidasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
