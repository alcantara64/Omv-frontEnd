
import { MediaComponent } from '../media/media.component';
import { AllMediaComponent } from '../media/all-media/all-media.component';
import { MediaStreamingArchiveComponent } from '../media/media-streaming-archive/media-streaming-archive.component';

import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        MediaComponent,
        AllMediaComponent,
        MediaStreamingArchiveComponent
    ],
    providers: []
})
export class MediaModule { }
