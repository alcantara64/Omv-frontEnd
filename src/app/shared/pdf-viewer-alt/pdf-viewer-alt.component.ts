import { Component, OnInit } from '@angular/core';
// import * as fdfj from '../../../assets/syncfusion-angular.pdf'

@Component({
  selector: 'app-pdf-viewer-alt',
  templateUrl: './pdf-viewer-alt.component.html',
  styleUrls: ['./pdf-viewer-alt.component.css']
})
export class PdfViewerAltComponent implements OnInit {
  // public currentPdf: DOMString = null;
  //
  // set src(input: Blob) {
  //   this.currentPdf = URL.createObjectURL(input);
  // }

  constructor() { }

  ngOnInit() {
  }

  public visible = { 0: true };

  public activateTab(tab: number): void {
    this.hideOtherPDFs();
    setTimeout(() => {
      this.visible[tab] = true;
    }, 100);
  }

  public hideOtherPDFs(): void {
    console.log('Hiding');
    this.visible[0] = false;
    this.visible[1] = false;
  }

}
