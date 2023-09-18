import { TestBed } from '@angular/core/testing';

import { UpdatePhotoServiceService } from './update-photo-service.service';

describe('UpdatePhotoServiceService', () => {
  let service: UpdatePhotoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePhotoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
