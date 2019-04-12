import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { Store, Select } from "@ngxs/store";
import { ActivatedRoute, Router } from "@angular/router";
import { ShowLeftNav, SetPageTitle } from 'src/app/state/app.actions';
import { MediaState } from 'src/app/media/state/media/media.state';
import { Observable } from 'rxjs';
import { GetMediaItem, GetMedia, SetCurrentMediaItemId, GetMediaItemDetails } from 'src/app/media/state/media/media.action';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from '../base/base.component';
import Viewer from 'viewerjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MediaViewerComponent extends BaseComponent implements OnInit, OnDestroy {
  public mediaOBJ: any;
  public media: string;
  public mediaType: string;
  public mediaSource: string;
  public service: string;
  public document: string;
  @Select(MediaState.getCurrentMediaItem) mediaItem$: Observable<string>;
  @Select(MediaState.getMedia) media$: Observable<any>;
  //  @Input() mediaDataSrc: any;
  dataSource: any;
  mediaID: string;
  url: string;
  trustedUrl: any;
  componentActive = true;
  constructor(protected store: Store, private router: Router, private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    super(store);

  }

  ngOnInit() {
    const activeId = this.activeRoute.snapshot.paramMap.get('id');
    console.log('activeId', activeId);
    this.mediaID = activeId;
    this.store.dispatch(new GetMediaItem(activeId));
    this.mediaItem$.subscribe(item => {
      console.log(item);
      if (item) {
        this.dataSource = item;
        this.toggleMediaViewer();
      }
    }),
      takeWhile(() => this.componentActive);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  toggleMediaViewer() {
    // this.mediaOBJ = this.dataSource.find((ids: { id: string; }) => ids.id === this.mediaID);
    this.mediaType = this.dataSource.type;
    this.toggleMediaType(this.mediaType);
  }

  toggleMediaType(val) {
    switch (val) {
      case 'DOCX': {
        this.url = `http://docs.google.com/gview?url=${this.dataSource.url}&embedded=true`;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

        break;
      }
      case 'XLS': {
        this.url = `http://docs.google.com/gview?url=${this.dataSource.url}&embedded=true`;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        break;
      }
      case 'PDF': {
        this.url = `http://docs.google.com/gview?url=${this.dataSource.url}&embedded=true`;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        break;
      }    
      case 'PNG':
      case 'JPG': {
        setTimeout(() => {
          console.log(this.dataSource.url)
          this.url = this.dataSource.url;
          const imageElement = window.document.querySelector('img.image');
          console.log('element', imageElement);
          const viewer = new Viewer(imageElement, {
            url: 'data-original',
            toolbar: {
              oneToOne: true,
              prev() {
                viewer.prev(true);
              },
              play: true,
              next() {
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
        }, 20);
    
        break;
      }
      default:
        break;

    }
  }
}
