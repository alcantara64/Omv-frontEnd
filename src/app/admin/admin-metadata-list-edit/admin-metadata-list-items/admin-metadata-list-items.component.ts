// import { Component, OnInit } from '@angular/core';
// import { GridColumn } from 'src/app/core/models/grid.column';
// import { MetadataList } from 'src/app/core/models/entity/metadata-list';
// import { Observable } from 'rxjs';
// import { AdminMediaState } from '../../state/admin-media/admin-media.state';
// import { Select, Store } from '@ngxs/store';
// import { ActivatedRoute } from '@angular/router';
// import { BaseComponent } from 'src/app/shared/base/base.component';
// // import { GetMetaDataLists, UpdateMetadataList, AddMetaDataListItem, GetMetaDataListItem } from '../../state/admin-media/admin-media.action';
// import { takeWhile } from 'rxjs/operators';
// import { EmitType } from '@syncfusion/ej2-base';

// @Component({
//   selector: 'app-admin-metadata-list-items',
//   templateUrl: './admin-metadata-list-items.component.html',
//   styleUrls: ['./admin-metadata-list-items.component.css']
// })
// export class AdminMetadataListItemsComponent extends BaseComponent implements OnInit {

 
//   listItemId: number;
//   MetadataList: MetadataList[] = [];
//   AlllistTypeId :number[] = [];
//   columns: GridColumn[] = [
//     { type: "checkbox", headerText: "Select All", width: "100", field: "" },
//     { type: "", headerText: "Name", width: "", field: "fieldName" },
    
//   ];
 
//   @Select(AdminMediaState.getActiveMetadataList) AdminMediaList$: Observable<MetadataList[]>;
//   @Select(AdminMediaState.getMetaDataLists) adminMetadataLists$: Observable<MetadataList[]>;

//   componentActive = true;
//   sublistItemId :number[] = [];
//   constructor(protected store: Store,
//     protected activatedRoute: ActivatedRoute) { super(store) }
//   ngOnInit() {
//     // this.store.dispatch(new  GetMetaDataList());
//     // // Get the id in the browser url and reach out for the User
//     // this.activatedRoute.paramMap.subscribe(params => {
//     //   this.listItemId = Number(params.get('id'));
//     //   if (this.listItemId) {
//     //     this.store.dispatch(new GetMetaDataListItem(this.listItemId));
//     //   }
//     }),
//     takeWhile(() => this.componentActive);

//     this.adminMetadataLists$.subscribe(lists => {
//       if (lists) {
//         this.sublistItemId = lists.map(x => x.id);
       
//       }
//     });
//     this.AdminMediaList$.subscribe(lists =>{
//       this.MetadataList = lists;
//     } )
//   }

//   // addMembersClick: EmitType < object > = () => {
//   //   this.store.dispatch(new AddMetaDataListItem(this.listItemId, this.sublistItemId));
//   //  // this.userIds = null;
//   //   //this.membersDialog.hide();
//   // }

//   ngOnDestroy(): void {
//     this.componentActive = false;
//   }

//   // updateGroups(selectedAdminMedataList: MetadataList[]) {
//   //   const listsIds = selectedAdminMedataList.map(list => list.id);
//   //   this.store.dispatch(new UpdateMetadataList(this.listId, listsIds)).toPromise().then(() => {
//   //     console.log('AdminUserGroupsComponent - updateGroups');
//   //     this.store.dispatch(new GetUserGroups(this.userId));
//   //   });
//   // }

// }
