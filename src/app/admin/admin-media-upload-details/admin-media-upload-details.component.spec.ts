import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMediaUploadDetailsComponent } from './admin-media-upload-details.component';

describe('AdminMediaUploadDetailsComponent', () => {
  let component: AdminMediaUploadDetailsComponent;
  let fixture: ComponentFixture<AdminMediaUploadDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMediaUploadDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMediaUploadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
