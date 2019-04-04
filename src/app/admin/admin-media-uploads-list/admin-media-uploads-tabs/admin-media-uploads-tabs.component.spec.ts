import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMediaUploadsTabsComponent } from './admin-media-uploads-tabs.component';

describe('AdminMediaUploadsTabsComponent', () => {
  let component: AdminMediaUploadsTabsComponent;
  let fixture: ComponentFixture<AdminMediaUploadsTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMediaUploadsTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMediaUploadsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
