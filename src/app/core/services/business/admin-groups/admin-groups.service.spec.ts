import { TestBed } from '@angular/core/testing';

import { AdminGroupsService } from './admin-groups.service';

describe('AdminGroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminGroupsService = TestBed.get(AdminGroupsService);
    expect(service).toBeTruthy();
  });
});
