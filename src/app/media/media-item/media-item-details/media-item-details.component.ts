import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store, Select } from '@ngxs/store';
import { SetMediaId } from '../../state/media/media.action';
import { Observable } from 'rxjs';
import { MediaState } from '../../state/media/media.state';

@Component({
  selector: 'app-media-item-details',
  templateUrl: './media-item-details.component.html',
  styleUrls: ['./media-item-details.component.css']
})
export class MediaItemDetailsComponent implements OnInit {
  public isPDF = true;

  public service: string = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
  public document: string = 'PDF_Succinctly.pdf';
  public minDate: Date = new Date("05/07/2017");
  public maxDate: Date = new Date("05/27/2017");
  public value: Date = new Date("05/16/2017");
  id: any;
  @Select(MediaState.setMediaItemId) mediaId$: Observable<number>;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private store: Store) { }

  ngOnInit() {
    this.mediaId$.subscribe(id => {
    this.id = id;
    });
  }

  activatePDFViewer() {
    this.router.navigate([`media-viewer/${this.id}`]);
  }
}
