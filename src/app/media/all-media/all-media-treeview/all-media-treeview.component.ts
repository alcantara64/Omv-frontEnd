import { Component, OnInit } from '@angular/core';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';
import { Observable } from 'rxjs';
import { MediaState } from '../../state/media/media.state';
import { Select, Store } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { GetMediaTreeData, GetMedia, GetDirectories, GetTreeViewMedia } from '../../state/media/media.action';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { EmitType } from '@syncfusion/ej2-base';
import { ITreeData } from '@syncfusion/ej2-treegrid';
import { Document } from 'src/app/core/models/entity/document';
import { Router } from '@angular/router';
import { MediaItem } from 'src/app/core/models/entity/media';
import { ShowSpinner } from 'src/app/state/app.actions';

@Component({
  selector: 'app-all-media-treeview',
  templateUrl: './all-media-treeview.component.html',
  styleUrls: ['./all-media-treeview.component.css']
})
export class AllMediaTreeviewComponent implements OnInit {

  media: MediaItem[];
  @Select(MediaState.getTreeViewMedia) media$: Observable<MediaItem[]>;
  selectionOptions: Object;
  options: any;
  columns: GridColumn[] = [
    { headerText: 'Name', field: 'name' },
    { headerText: 'Date', field: 'modifiedOnString' }
  ];

  constructor(private store: Store, private router: Router) {

  }

  ngOnInit() {
    this.store.dispatch(new ShowSpinner());
    this.store.dispatch(new GetMedia());
    this.media$.subscribe(data => {
      this.media = data;
      console.log('AllMediaTreeviewComponent ngOnInit - data', data);
      if (data) {
        this.selectionOptions = {
          mode: 'Row', cellSelectionMode: 'Flow', type: 'Single', checkboxOnly: false,
          persistSelection: false, checkboxMode: 'ResetOnRowClick', enableSimpleMultiRowSelection: true,
          enableToggle: false
        };
      }
    });
  }

  performToggleFavorite(data: any) {
    data.isFavorite = !data.isFavorite;
  }

  rowChecked(data: any) {
    console.log('AllMediaTreeViewComponent - rowChecked: ', data);
  }

  checkboxSelected(action) {
    console.log(action.data);
  }

  queryCellInfo(args) {
    console.log('args.data', args.data);
    if (args.column.field === 'name' && (args.data.Children || args.data.directoryId)) {
      let imgElement: HTMLElement = document.createElement('IMG');
      let val: string = !(<ITreeData>args.data).level ? args.data[args.column.field] :
        (<ITreeData>args.data).parentItem[args.column.field];
      console.log(val);
      imgElement.setAttribute('src', '../../../../assets/images/shape.svg');
      imgElement.classList.add('e-image');
      let div: HTMLElement = document.createElement('DIV');
      div.style.display = 'inline-block';
      div.appendChild(imgElement);
      let cellValue: HTMLElement = document.createElement('DIV');
      cellValue.innerHTML = args.cell.querySelector('.e-treecell').innerHTML;
      cellValue.setAttribute('style', 'display:inline-block;padding-left:6px');
      args.cell.querySelector('.e-treecell').innerHTML = '';
      args.cell.querySelector('.e-treecell').appendChild(div);
      args.cell.querySelector('.e-treecell').appendChild(cellValue);
    }
  }
  
  navigate(data: any) {
    this.router.navigate([`media/${data.documentId}/details`]);
  }

  download(arg: any) {
    console.log('AAA', arg.url);
  }
}
