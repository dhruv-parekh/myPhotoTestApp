import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlbumComponent } from './create-album.component';

describe('CreateAlbumComponent', () => {
  let component: CreateAlbumComponent;
  let fixture: ComponentFixture<CreateAlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAlbumComponent]
    });
    fixture = TestBed.createComponent(CreateAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
