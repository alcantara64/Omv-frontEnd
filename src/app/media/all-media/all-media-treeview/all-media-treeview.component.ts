import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaState } from '../../state/media/media.state';
import { Select, Store } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { GetTreeViewMedia } from '../../state/media/media.action';
import { ITreeData } from '@syncfusion/ej2-treegrid';
import { Router } from '@angular/router';
import { MediaItem } from 'src/app/core/models/entity/media';
import { ShowSpinner } from 'src/app/state/app.actions';
import { PageService} from '@syncfusion/ej2-angular-treegrid';
declare var require: any;

@Component({
  selector: 'app-all-media-treeview',
  templateUrl: './all-media-treeview.component.html',
  styleUrls: ['./all-media-treeview.component.css'],
  providers: [ PageService ]
})
export class AllMediaTreeviewComponent implements OnInit {

  media: MediaItem[];
  @Select(MediaState.getTreeViewMedia) media$: Observable<MediaItem[]>;
  selectionOptions: Object;
  options: any;
  columns: GridColumn[] = [
    { headerText: 'Name', field: 'name', showCheckbox: true },
    { headerText: 'Date', field: 'modifiedOnString' }
  ]; 

  constructor(private store: Store, private router: Router) {

  }

  ngOnInit() {
    this.store.dispatch(new ShowSpinner());
    this.store.dispatch(new GetTreeViewMedia());
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

  download(data: any) {
    var FileSaver = require('file-saver');
    FileSaver.saveAs(data.url, data.name);
  }
}
