import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMediaComponent } from './all-media.component';

describe('AllMediaComponent', () => {
  let component: AllMediaComponent;
  let fixture: ComponentFixture<AllMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
