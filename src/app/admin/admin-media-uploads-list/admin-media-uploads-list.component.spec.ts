import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMediaUploadsListComponent } from './admin-media-uploads-list.component';

describe('AdminMediaUploadsListComponent', () => {
  let component: AdminMediaUploadsListComponent;
  let fixture: ComponentFixture<AdminMediaUploadsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMediaUploadsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMediaUploadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
