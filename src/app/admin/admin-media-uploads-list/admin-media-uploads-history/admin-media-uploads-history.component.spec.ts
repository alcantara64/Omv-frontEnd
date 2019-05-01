import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMediaUploadsHistoryComponent } from './admin-media-uploads-history.component';

describe('AdminMediaUploadsHistoryComponent', () => {
  let component: AdminMediaUploadsHistoryComponent;
  let fixture: ComponentFixture<AdminMediaUploadsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMediaUploadsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMediaUploadsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
