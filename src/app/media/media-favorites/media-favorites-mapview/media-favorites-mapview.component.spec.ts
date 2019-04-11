import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFavoritesMapviewComponent } from './media-favorites-mapview.component';

describe('MediaFavoritesMapviewComponent', () => {
  let component: MediaFavoritesMapviewComponent;
  let fixture: ComponentFixture<MediaFavoritesMapviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaFavoritesMapviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFavoritesMapviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
