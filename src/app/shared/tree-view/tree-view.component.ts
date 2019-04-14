import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { ITreeData } from '@syncfusion/ej2-treegrid';
import { EmitType } from '@syncfusion/ej2-base';
import { RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {

  @Input() dataSource: any;
  @Input() columns: GridColumn[];
  @Input() treeColumnIndex: number = 2;
  @Input() idMapping: string;
  @Input() parentIdMapping: string;
  @Input() hasChildMapping: boolean;
  @Input() selectionOptions: Object;
  @Input() showFavorite: number;
  @Input() showFolderIcon: boolean;
  @Input() allowNavigating: boolean;
  @Input() allowChecking: boolean;
  @Input() allowDownloading: boolean;

  @Output() clickFavorite = new EventEmitter<any>();
  @Output() download = new EventEmitter<any>();
  @Output() navigate = new EventEmitter<any>();
  @Output() rowChecked = new EventEmitter<any>();
  @Output() rowSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log('TreeViewComponent - ngOnInit dataSource: ', this.dataSource);
  }

  dataSourceChangedEvent(args: any) {
    console.log('TreeViewComponent - dataSourceChangedEvent: ', args);
  }

  rowDataBound(args: any) {
    console.log('TreeViewComponent - rowDataBound: ', args);
  }

  clickFavoriteEvent(data: any) {
    data.isFavorite = !data.isFavorite;
    console.log('TreeViewComponent - clickFavoriteEvent: ', data);
    this.clickFavorite.emit(data);
  }

  downloadEvent(data: any) {
    console.log('TreeViewComponent - downloadEvent: ', data);
    this.download.emit(data);
  }

  navigateEvent(data: any) {
    console.log('TreeViewComponent - navigateEvent: ', data);
    this.navigate.emit(data);
  }

  rowCheckedEvent(data: any) {
    console.log('TreeViewComponent - rowCheckedEvent: ', data);    
    this.rowChecked.emit(data);
  }

  rowSelectedEvent(data: RowSelectEventArgs) {
    let isRowCollapsedOrExpanded = data.target.classList.value.includes('expand') || data.target.classList.value.includes('collapse');    
    if (isRowCollapsedOrExpanded) return;
    this.dataSource.map(item => {
      if (item.documentId) {
        item.isChecked = true;
        item.isFavorite = true;
      }
    });
    this.rowSelected.emit(data);
  }

  addFolderIcon(args) {
    // console.log('args.data', args.data);
    if (!this.showFolderIcon) return;
    if (args.column.field === 'name' && (args.data.Children || args.data.directoryId)) {
      let imgElement: HTMLElement = document.createElement('IMG');
      let val: string = !(<ITreeData>args.data).level ? args.data[args.column.field] :
        (<ITreeData>args.data).parentItem[args.column.field];
      console.log(val);
      imgElement.setAttribute('src', '../../../../assets/images/icon-folder.svg');
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
}
