import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMutipalPostComponent } from './delete-mutipal-post.component';

describe('DeleteMutipalPostComponent', () => {
  let component: DeleteMutipalPostComponent;
  let fixture: ComponentFixture<DeleteMutipalPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMutipalPostComponent]
    });
    fixture = TestBed.createComponent(DeleteMutipalPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
