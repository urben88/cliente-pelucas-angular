import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabellosFormComponent } from './cabellos-form.component';

describe('CabellosFormComponent', () => {
  let component: CabellosFormComponent;
  let fixture: ComponentFixture<CabellosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabellosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabellosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
