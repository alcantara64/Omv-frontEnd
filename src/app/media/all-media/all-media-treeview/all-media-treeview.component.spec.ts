import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMediaTreeviewComponent } from './all-media-treeview.component';

describe('AllMediaTreeviewComponent', () => {
  let component: AllMediaTreeviewComponent;
  let fixture: ComponentFixture<AllMediaTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMediaTreeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMediaTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
