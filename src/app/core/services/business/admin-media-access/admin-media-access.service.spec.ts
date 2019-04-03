import { TestBed } from '@angular/core/testing';

import { AdminMediaAccessService } from './admin-media-access.service';

describe('AdminMediaAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMediaAccessService = TestBed.get(AdminMediaAccessService);
    expect(service).toBeTruthy();
  });
});
