import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupMembersComponent } from './admin-group-members.component';

describe('AdminGroupMembersComponent', () => {
  let component: AdminGroupMembersComponent;
  let fixture: ComponentFixture<AdminGroupMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
