import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemHistoryComponent } from './media-item-history.component';

describe('MediaItemHistoryComponent', () => {
  let component: MediaItemHistoryComponent;
  let fixture: ComponentFixture<MediaItemHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
