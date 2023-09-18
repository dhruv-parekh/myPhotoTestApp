import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAlbumsComponent } from './my-albums.component';

describe('MyAlbumsComponent', () => {
  let component: MyAlbumsComponent;
  let fixture: ComponentFixture<MyAlbumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAlbumsComponent]
    });
    fixture = TestBed.createComponent(MyAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
