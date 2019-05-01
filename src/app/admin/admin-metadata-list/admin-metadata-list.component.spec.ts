import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMetadataListComponent } from './admin-metadata-list.component';

describe('AdminMetadataListComponent', () => {
  let component: AdminMetadataListComponent;
  let fixture: ComponentFixture<AdminMetadataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMetadataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMetadataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
