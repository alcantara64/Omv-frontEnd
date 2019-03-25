import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersTabsComponent } from './admin-users-tabs.component';

describe('AdminUsersTabsComponent', () => {
  let component: AdminUsersTabsComponent;
  let fixture: ComponentFixture<AdminUsersTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
