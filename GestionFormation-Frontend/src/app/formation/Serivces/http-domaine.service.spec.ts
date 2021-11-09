import { TestBed } from '@angular/core/testing';

import { HttpDomaineService } from './http-domaine.service';

describe('HttpDomaineService', () => {
  let service: HttpDomaineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDomaineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
