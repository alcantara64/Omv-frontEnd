import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemRelatedFilesComponent } from './media-item-related-files.component';

describe('MediaItemRelatedFilesComponent', () => {
  let component: MediaItemRelatedFilesComponent;
  let fixture: ComponentFixture<MediaItemRelatedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemRelatedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemRelatedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
