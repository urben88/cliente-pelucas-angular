import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDBerrorsComponent } from './alert-dberrors.component';

describe('AlertDBerrorsComponent', () => {
  let component: AlertDBerrorsComponent;
  let fixture: ComponentFixture<AlertDBerrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertDBerrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDBerrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
