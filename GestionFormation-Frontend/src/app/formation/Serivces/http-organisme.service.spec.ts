import { TestBed } from '@angular/core/testing';

import { HttpOrganismeService } from './http-organisme.service';

describe('HttpOrganismeService', () => {
  let service: HttpOrganismeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpOrganismeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
