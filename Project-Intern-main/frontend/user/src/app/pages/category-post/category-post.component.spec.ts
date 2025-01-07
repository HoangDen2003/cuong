import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPostComponent } from './category-post.component';

describe('CategoryPostComponent', () => {
  let component: CategoryPostComponent;
  let fixture: ComponentFixture<CategoryPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPostComponent]
    });
    fixture = TestBed.createComponent(CategoryPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
