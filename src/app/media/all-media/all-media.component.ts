import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/core/services/business/media/media.service';
import { Media } from 'src/app/core/models/entity/media';


@Component({
  selector: 'app-all-media',
  templateUrl: './all-media.component.html',
  styleUrls: ['./all-media.component.css']
})
export class AllMediaComponent implements OnInit {
  data: Media[];
  mediaType: string;
  constructor(private mediaService : MediaService) { }

  ngOnInit() {
    this.mediaService.getMedia().subscribe((data)=>{
        this.data = data;
        console.log('data',this.data);
      }
    );
  }
}
