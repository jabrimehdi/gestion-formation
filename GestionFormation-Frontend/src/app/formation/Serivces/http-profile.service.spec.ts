import { TestBed } from '@angular/core/testing';

import { HttpProfileService } from './http-profile.service';

describe('HttpProfileService', () => {
  let service: HttpProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
