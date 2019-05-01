import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMetadataListTabComponent } from './admin-metadata-list-tab.component';

describe('AdminMetadataListTabComponent', () => {
  let component: AdminMetadataListTabComponent;
  let fixture: ComponentFixture<AdminMetadataListTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMetadataListTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMetadataListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
