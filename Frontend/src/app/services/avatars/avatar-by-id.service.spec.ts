import { TestBed } from '@angular/core/testing';

import { AvatarByIdService } from './avatar-by-id.service';

describe('AvatarByIdService', () => {
  let service: AvatarByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
