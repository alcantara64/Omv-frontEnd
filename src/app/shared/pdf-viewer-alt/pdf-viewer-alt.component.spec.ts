import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewerAltComponent } from './pdf-viewer-alt.component';

describe('PdfViewerAltComponent', () => {
  let component: PdfViewerAltComponent;
  let fixture: ComponentFixture<PdfViewerAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfViewerAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfViewerAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
