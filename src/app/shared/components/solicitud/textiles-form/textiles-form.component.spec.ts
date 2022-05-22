import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextilesFormComponent } from './textiles-form.component';

describe('TextilesFormComponent', () => {
  let component: TextilesFormComponent;
  let fixture: ComponentFixture<TextilesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextilesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextilesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
