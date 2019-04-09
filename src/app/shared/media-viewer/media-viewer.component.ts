import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Store, Select } from "@ngxs/store";
import { ActivatedRoute, Router } from "@angular/router";
import { ShowLeftNav, SetPageTitle } from 'src/app/state/app.actions';
import { MediaState } from 'src/app/media/state/media/media.state';
import { Observable } from 'rxjs';
import { GetMediaItem, GetMedia } from 'src/app/media/state/media/media.action';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from '../base/base.component';
import Viewer from 'viewerjs';

@Component({
  selector: 'app-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MediaViewerComponent extends BaseComponent implements OnInit {
  public mediaOBJ: any;
  public media: string;
  public mediaType: string;
  public mediaSource: string;
  public service: string;
  public document: string;
  @Select(MediaState.setMediaItemId) mediaId$: Observable<any>;
  @Select(MediaState.getMedia) media$: Observable<any>;
  //  @Input() mediaDataSrc: any;
  mediaDataSrc: any;
  mediaID: number;
  url: string;
  trustedUrl: any;
  constructor(protected store: Store, private router: Router, private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    super(store);

  }

  ngOnInit() {
    this.mediaID = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.store.dispatch(new GetMedia());
    this.media$.subscribe(mediaDataSrc => {
      this.mediaDataSrc = mediaDataSrc;
      if (mediaDataSrc.length > 1) {
        this.toggleMediaViewer();
      }
    });

  }

  toggleMediaViewer() {
    this.mediaOBJ = this.mediaDataSrc.find((ids: { id: number; }) => ids.id === this.mediaID);
    this.mediaSource = this.mediaOBJ.mediaPath;
    const x = this.mediaSource;
    this.mediaType = this.mediaOBJ.type;
    setTimeout(() => {
      this.toggleMediaType(this.mediaType);
    }, 20);
  }

  toggleMediaType(val) {
    switch (val) {
      case 'DOC': {
        this.url = 'http://docs.google.com/gview?url=https://ocean33r1ngm3d1avault.blob.core.windows.net/media/Platform/rigs/ursa/2018/Documents/file-sample_100kB.docx&embedded=true';
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        break;
      }
      case 'XLS': {
        this.url = 'http://docs.google.com/gview?url=https://www.cmu.edu/blackboard/files/evaluate/tests-example.xls&embedded=true';
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        break;
      }
      case 'PDF': {
        this.url = 'http://docs.google.com/gview?url=https://ocean33r1ngm3d1avault.blob.core.windows.net/media/Platform/rigs/aurora/2017/document/OMV-Core.pdf&embedded=true';
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        break;
      }
      case 'JPG': {
        const imageElement = window.document.querySelector('img.image');
        console.log('element', imageElement);
        const viewer = new Viewer(imageElement, {
          url: 'data-original',
          toolbar: {
            oneToOne: true,
            prev: function () {
              viewer.prev(true);
            },
            play: true,
            next: function () {
              viewer.next(true);
            },
            // download() {
            //   const a = document.createElement('a');
            //   a.href = viewer.image.src;
            //   a.download = viewer.image.alt;
            //   document.body.appendChild(a);
            //   a.click();
            //   document.body.removeChild(a);
            // },
          },
        });
        break;
      }
      default:
        break;

    }
  }
}
