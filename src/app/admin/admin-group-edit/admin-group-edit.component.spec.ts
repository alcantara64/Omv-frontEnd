import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupEditComponent } from './admin-group-edit.component';

describe('AdminGroupEditComponent', () => {
  let component: AdminGroupEditComponent;
  let fixture: ComponentFixture<AdminGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
