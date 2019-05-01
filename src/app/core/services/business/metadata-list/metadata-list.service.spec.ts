import { TestBed } from '@angular/core/testing';

import { MetadataListService } from './metadata-list.service';

describe('MetadataListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetadataListService = TestBed.get(MetadataListService);
    expect(service).toBeTruthy();
  });
});
