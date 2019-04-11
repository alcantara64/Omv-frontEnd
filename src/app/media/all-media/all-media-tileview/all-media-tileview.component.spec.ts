import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMediaTileviewComponent } from './all-media-tileview.component';

describe('AllMediaTileviewComponent', () => {
  let component: AllMediaTileviewComponent;
  let fixture: ComponentFixture<AllMediaTileviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMediaTileviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMediaTileviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
