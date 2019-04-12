import { Component, OnInit } from '@angular/core';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';
import { Observable } from 'rxjs';
import { MediaState } from '../../state/media/media.state';
import { Select, Store } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { GetMediaTreeData, GetMedia, GetDirectories, GetDocuments } from '../../state/media/media.action';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { EmitType } from '@syncfusion/ej2-base';
import { ITreeData } from '@syncfusion/ej2-treegrid';
import { Document } from 'src/app/core/models/entity/document';

@Component({
  selector: 'app-all-media-treeview',
  templateUrl: './all-media-treeview.component.html',
  styleUrls: ['./all-media-treeview.component.css']
})
export class AllMediaTreeviewComponent implements OnInit {

  public data: Document[];
  @Select(MediaState.getDocuments) data$: Observable<Document[]>;
  selectionOptions: Object;
  options: any;
  columns: GridColumn[] = [
    { headerText: 'Name', field: 'name', width: '700' },
    { headerText: 'Date', field: 'modifiedOnString' }
  ];

  constructor(private store: Store) {

  }

  ngOnInit() {
    this.store.dispatch(new GetDocuments());
    this.data$.subscribe(data => {
      this.data = data;
      console.log('data', data);
      if (data) {
        this.selectionOptions = {
          mode: 'Row', cellSelectionMode: 'Flow', type: 'Single', checkboxOnly: true,
          persistSelection: false, checkboxMode: 'Default', enableSimpleMultiRowSelection: true,
          enableToggle: false
        };
      }
    });
  }

  performToggleFavorite(data: any) {
    data.isFavorite = !data.isFavorite;
  }

  rowSelected(action) {
    console.log(action.data);
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

  download(arg: any) {
    console.log('AAA', arg.url);
    // window.location.href = `${arg.url}`;
  }
}
