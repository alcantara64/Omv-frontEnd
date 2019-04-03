import { Component, OnInit } from '@angular/core';
import { MediaItem } from 'src/app/core/models/entity/media';
import { MediaService } from 'src/app/core/services/business/media/media.service';

@Component({
  selector: 'app-all-media-tileview',
  templateUrl: './all-media-tileview.component.html',
  styleUrls: ['./all-media-tileview.component.css']
})
export class AllMediaTileviewComponent implements OnInit {
  
  data: MediaItem[];
  mediaType: string;
  constructor(private mediaService : MediaService) { }

  ngOnInit() {

    this.mediaService.getMedia().subscribe((data)=>{
      this.data = data;
      console.log('data',this.data);
    });
  }
}
