import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLanguageDialogComponent } from './edit-language-dialog.component';

describe('EditLanguageDialogComponent', () => {
  let component: EditLanguageDialogComponent;
  let fixture: ComponentFixture<EditLanguageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLanguageDialogComponent]
    });
    fixture = TestBed.createComponent(EditLanguageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
