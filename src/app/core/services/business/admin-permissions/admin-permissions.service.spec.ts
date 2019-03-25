import { TestBed } from '@angular/core/testing';

import { AdminPermissionsService } from './admin-permissions.service';

describe('AdminPermissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPermissionsService = TestBed.get(AdminPermissionsService);
    expect(service).toBeTruthy();
  });
});
