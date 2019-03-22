import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent extends ListComponent implements OnInit {

  constructor(protected store: Store) {
    super(store);

    this.ShowLefNav(false);
  }

  ngOnInit() {

  }

}
