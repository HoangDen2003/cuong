import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatusDialogComponent } from './edit-status-dialog.component';

describe('EditStatusDialogComponent', () => {
  let component: EditStatusDialogComponent;
  let fixture: ComponentFixture<EditStatusDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStatusDialogComponent]
    });
    fixture = TestBed.createComponent(EditStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
