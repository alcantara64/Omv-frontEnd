import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMetadataListItemsComponent } from './admin-metadata-list-items.component';

describe('AdminMetadataListItemsComponent', () => {
  let component: AdminMetadataListItemsComponent;
  let fixture: ComponentFixture<AdminMetadataListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMetadataListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMetadataListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
