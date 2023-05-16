import { TestBed } from '@angular/core/testing';

import { MetafieldsService } from './metafields.service';

describe('MetafieldsService', () => {
  let service: MetafieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetafieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
