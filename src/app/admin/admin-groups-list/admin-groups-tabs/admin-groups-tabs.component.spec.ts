import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupsTabsComponent } from './admin-groups-tabs.component';

describe('AdminGroupsTabsComponent', () => {
  let component: AdminGroupsTabsComponent;
  let fixture: ComponentFixture<AdminGroupsTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupsTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
