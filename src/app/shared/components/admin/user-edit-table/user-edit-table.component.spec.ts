import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditTableComponent } from './user-edit-table.component';

describe('UserEditTableComponent', () => {
  let component: UserEditTableComponent;
  let fixture: ComponentFixture<UserEditTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
