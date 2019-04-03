import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFavoritesListviewComponent } from './media-favorites-listview.component';

describe('MediaFavoritesListviewComponent', () => {
  let component: MediaFavoritesListviewComponent;
  let fixture: ComponentFixture<MediaFavoritesListviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaFavoritesListviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFavoritesListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
