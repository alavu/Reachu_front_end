import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryServiceComponent } from './category-service.component';

describe('CategoryServiceComponent', () => {
  let component: CategoryServiceComponent;
  let fixture: ComponentFixture<CategoryServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryServiceComponent]
    });
    fixture = TestBed.createComponent(CategoryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
