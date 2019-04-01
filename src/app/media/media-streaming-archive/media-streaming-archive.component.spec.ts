import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaStreamingArchiveComponent } from './media-streaming-archive.component';

describe('MediaStreamingArchiveComponent', () => {
  let component: MediaStreamingArchiveComponent;
  let fixture: ComponentFixture<MediaStreamingArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaStreamingArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaStreamingArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
