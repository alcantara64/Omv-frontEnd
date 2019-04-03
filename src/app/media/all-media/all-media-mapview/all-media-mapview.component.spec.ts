import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMediaMapviewComponent } from './all-media-mapview.component';

describe('AllMediaMapviewComponent', () => {
  let component: AllMediaMapviewComponent;
  let fixture: ComponentFixture<AllMediaMapviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMediaMapviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMediaMapviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
