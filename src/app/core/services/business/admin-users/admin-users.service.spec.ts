import { TestBed } from '@angular/core/testing';

import { AdminUsersService } from './admin-users.service';

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUsersService = TestBed.get(AdminUsersService);
    expect(service).toBeTruthy();
  }); 
});
