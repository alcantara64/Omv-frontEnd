import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMediaNewUploadsComponent } from './admin-media-new-uploads.component';

describe('AdminMediaNewUploadsComponent', () => {
  let component: AdminMediaNewUploadsComponent;
  let fixture: ComponentFixture<AdminMediaNewUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMediaNewUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMediaNewUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
