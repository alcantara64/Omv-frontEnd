import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFavoritesTreeviewComponent } from './media-favorites-treeview.component';

describe('MediaFavoritesTreeviewComponent', () => {
  let component: MediaFavoritesTreeviewComponent;
  let fixture: ComponentFixture<MediaFavoritesTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaFavoritesTreeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFavoritesTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
