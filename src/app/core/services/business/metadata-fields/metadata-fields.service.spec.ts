import { TestBed } from '@angular/core/testing';

import { MetadataFieldsService } from './metadata-fields.service';

describe('MetadataFieldsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetadataFieldsService = TestBed.get(MetadataFieldsService);
    expect(service).toBeTruthy();
  });
});
