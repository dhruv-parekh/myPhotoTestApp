import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailsComponent } from './photo-details.component';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoDetailsComponent]
    });
    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
