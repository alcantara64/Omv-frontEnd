import { TestBed } from '@angular/core/testing';

import { AdminMediaService } from './admin-media.service';

describe('AdminMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMediaService = TestBed.get(AdminMediaService);
    expect(service).toBeTruthy();
  });
});
