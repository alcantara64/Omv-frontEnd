import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMetadataFieldsComponent } from './admin-metadata-fields.component';

describe('AdminMetadataFieldsComponent', () => {
  let component: AdminMetadataFieldsComponent;
  let fixture: ComponentFixture<AdminMetadataFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMetadataFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMetadataFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
