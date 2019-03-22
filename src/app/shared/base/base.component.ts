import { Component, OnInit } from '@angular/core';
import { permission } from 'src/app/core/enum/permission';
import { Store } from '@ngxs/store';
import { ShowLeftNav } from 'src/app/state/app.actions';


export class BaseComponent implements OnInit {

  private _permission:string;

  constructor(protected store: Store) {
    console.log('Base - constructor');
  }

  ngOnInit() {

  }

  get Permission():string {
       return this._permission;
   }
   set Permission(value:string) {
       this._permission = value;
   }


  protected ShowLefNav(show: boolean)
  {
    if(show)
    {
      this.store.dispatch(new ShowLeftNav(true));
    }
    else
    {
      this.store.dispatch(new ShowLeftNav(false));
    }
  }

}
