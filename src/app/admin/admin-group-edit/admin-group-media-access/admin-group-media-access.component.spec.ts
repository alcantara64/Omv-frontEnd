import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupMediaAccessComponent } from './admin-group-media-access.component';

describe('AdminGroupMediaAccessComponent', () => {
  let component: AdminGroupMediaAccessComponent;
  let fixture: ComponentFixture<AdminGroupMediaAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupMediaAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupMediaAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
