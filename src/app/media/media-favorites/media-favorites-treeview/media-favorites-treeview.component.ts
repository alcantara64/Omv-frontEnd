import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetMediaTreeData } from '../../state/media/media.action';
import { MediaState } from '../../state/media/media.state';
import { Observable } from 'rxjs';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';
import { SelectionSettings, SelectionSettingsModel } from '@syncfusion/ej2-angular-grids';
import { CheckboxSelectionType } from '@syncfusion/ej2-grids';

@Component({
  selector: 'app-media-favorites-treeview',
  templateUrl: './media-favorites-treeview.component.html',
  styleUrls: ['./media-favorites-treeview.component.css']
})
export class MediaFavoritesTreeviewComponent implements OnInit {
  public data: MediaTreeGrid[];
  @Select(MediaState.getMediaTreeData) mediaData$: Observable<MediaTreeGrid[]>;
  selectionOptions: Object;
  options: any;
  constructor(private store: Store) {

  }

  ngOnInit() {
    this.store.dispatch(new GetMediaTreeData());
    this.mediaData$.subscribe(data => {
      this.data = data;
      this.data.forEach(item => {
        console.log('checked', item.isChecked);
      });
      if (data) {
        this.selectionOptions = {
          mode: 'Row', cellSelectionMode: 'Flow', type: 'Single', checkboxOnly: true,
          persistSelection: false, checkboxMode: 'Default', enableSimpleMultiRowSelection: true,
         enableToggle: false};
      }
    });
  }

  performToggleFavorite(data: any) {
    data.isFavorite = !data.isFavorite;
  }

  rowSelected(action) {
    console.log(action.data);
  }
}
