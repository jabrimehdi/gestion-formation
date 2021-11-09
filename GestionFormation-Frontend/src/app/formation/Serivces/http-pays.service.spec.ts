import { TestBed } from '@angular/core/testing';

import { HttpPaysService } from './http-pays.service';

describe('HttpPaysService', () => {
  let service: HttpPaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
