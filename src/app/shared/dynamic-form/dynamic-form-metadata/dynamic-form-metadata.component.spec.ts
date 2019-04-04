import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormMetadataComponent } from './dynamic-form-metadata.component';

describe('DynamicFormMetadataComponent', () => {
  let component: DynamicFormMetadataComponent;
  let fixture: ComponentFixture<DynamicFormMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
