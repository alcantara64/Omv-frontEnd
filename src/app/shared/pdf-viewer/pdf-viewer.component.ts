import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SetPageTitle, ShowLeftNav} from "../../state/app.actions";
import {Store} from "@ngxs/store";


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  public service = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
  public document = 'PDF_Succinctly.pdf';

  constructor(private router: ActivatedRoute, private store: Store) {
    this.store.dispatch(new ShowLeftNav(false));
    this.store.dispatch(new SetPageTitle('PDF Viewer'));
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
        // this.document = "https://ocean33r1ngm3d1avault.blob.core.windows.net/media/Platform/rigs/ursa/2019/Documents/OMV-Tenant.pdf";
      });
  }

}
