import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-media-item-details',
  templateUrl: './media-item-details.component.html',
  styleUrls: ['./media-item-details.component.css']
})
export class MediaItemDetailsComponent implements OnInit {
  public isPDF = true;

  public service: string = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
  public document: string = 'PDF_Succinctly.pdf';

  public minDate: Date = new Date ("05/07/2017");
  public maxDate: Date = new Date ("05/27/2017");
  public value: Date = new Date ("05/16/2017");

  constructor(private router: Router) { }

  ngOnInit() {
  }

  activatePDFViewer() {
    this.router.navigate(['pdf-viewer', {service: this.service, document: this.document }]);
  }
}
