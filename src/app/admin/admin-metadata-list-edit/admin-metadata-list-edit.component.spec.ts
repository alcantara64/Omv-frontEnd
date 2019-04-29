import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMetadataListEditComponent } from './admin-metadata-list-edit.component';

describe('AdminMetadataListEditComponent', () => {
  let component: AdminMetadataListEditComponent;
  let fixture: ComponentFixture<AdminMetadataListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMetadataListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMetadataListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
