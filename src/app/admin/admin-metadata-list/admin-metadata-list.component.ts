import { Component, OnInit } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';

@Component({
  selector: 'app-admin-metadata-list',
  templateUrl: './admin-metadata-list.component.html',
  styleUrls: ['./admin-metadata-list.component.css']
})
export class AdminMetadataListComponent extends ListComponent implements OnInit {
  columns: GridColumn[] = [
    { type: 'checkbox', headerText: 'Select All', width: '50', field: '' },
    { headerText: 'Name', field: 'name', width: '180' },
    { headerText: 'Fields', field: 'field', width: '180' },
  ]
  constructor(protected store: Store) {
    super(store);
    this.ShowLefNav(true);
  }

  ngOnInit() {
  }

}
