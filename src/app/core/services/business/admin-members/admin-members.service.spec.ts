import { TestBed } from '@angular/core/testing';

import { AdminMembersService } from './admin-members.service';

describe('AdminMembersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMembersService = TestBed.get(AdminMembersService);
    expect(service).toBeTruthy();
  });
});
