import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFavoritesComponent } from './media-favorites.component';

describe('MediaFavoritesComponent', () => {
  let component: MediaFavoritesComponent;
  let fixture: ComponentFixture<MediaFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
