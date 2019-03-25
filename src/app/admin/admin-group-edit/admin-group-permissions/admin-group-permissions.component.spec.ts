import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupPermissionsComponent } from './admin-group-permissions.component';

describe('AdminGroupPermissionsComponent', () => {
  let component: AdminGroupPermissionsComponent;
  let fixture: ComponentFixture<AdminGroupPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
