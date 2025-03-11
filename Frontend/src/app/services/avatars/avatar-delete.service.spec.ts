import { TestBed } from '@angular/core/testing';

import { AvatarDeleteService } from './avatar-delete.service';

describe('AvatarDeleteService', () => {
  let service: AvatarDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
