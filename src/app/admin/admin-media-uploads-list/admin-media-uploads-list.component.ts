import { Component, OnInit } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-media-uploads-list',
  templateUrl: './admin-media-uploads-list.component.html',
  styleUrls: ['./admin-media-uploads-list.component.css']
})
export class AdminMediaUploadsListComponent extends ListComponent implements OnInit {

  constructor(
    protected store: Store,
    protected router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(store);
    this.ShowLefNav(true);
    this.PageTitle('Admin User');
  }

  ngOnInit() {
  }

}
