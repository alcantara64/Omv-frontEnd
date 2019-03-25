import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserGroupsComponent } from './admin-user-groups.component';

describe('AdminUserGroupsComponent', () => {
  let component: AdminUserGroupsComponent;
  let fixture: ComponentFixture<AdminUserGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
