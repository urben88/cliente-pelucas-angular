import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesisFormComponent } from './protesis-form.component';

describe('ProtesisFormComponent', () => {
  let component: ProtesisFormComponent;
  let fixture: ComponentFixture<ProtesisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesisFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
