import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFavoritesTileviewComponent } from './media-favorites-tileview.component';

describe('MediaFavoritesTileviewComponent', () => {
  let component: MediaFavoritesTileviewComponent;
  let fixture: ComponentFixture<MediaFavoritesTileviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaFavoritesTileviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFavoritesTileviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
