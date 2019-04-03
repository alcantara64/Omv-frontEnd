import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMediaListviewComponent } from './all-media-listview.component';

describe('AllMediaListviewComponent', () => {
  let component: AllMediaListviewComponent;
  let fixture: ComponentFixture<AllMediaListviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMediaListviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMediaListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
