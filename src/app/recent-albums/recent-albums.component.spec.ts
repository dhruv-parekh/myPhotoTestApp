import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentAlbumsComponent } from './recent-albums.component';

describe('RecentAlbumsComponent', () => {
  let component: RecentAlbumsComponent;
  let fixture: ComponentFixture<RecentAlbumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentAlbumsComponent]
    });
    fixture = TestBed.createComponent(RecentAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
