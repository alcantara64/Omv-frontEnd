import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupsListComponent } from './admin-groups-list.component';

describe('AdminGroupsComponent', () => {
  let component: AdminGroupsListComponent;
  let fixture: ComponentFixture<AdminGroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
