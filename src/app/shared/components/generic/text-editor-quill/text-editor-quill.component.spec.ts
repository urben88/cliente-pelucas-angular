import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorQuillComponent } from './text-editor-quill.component';

describe('TextEditorQuillComponent', () => {
  let component: TextEditorQuillComponent;
  let fixture: ComponentFixture<TextEditorQuillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextEditorQuillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorQuillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
