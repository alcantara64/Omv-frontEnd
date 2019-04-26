import { MediaUploadService } from './../../media-upload/media-upload.service';
import {
  GetHistory, GetMediaItemDetails, GetFavorites, ToggleFavorite, GetMediaTreeData,
  AddMediaItemField, RemoveMediaItemField, GetDirectoryMetadata, SetCurrentMediaItemId, GetMediaItem, GetDirectories, UpdateMediaItem, CreateMediaItem,
  ClearMediaItemMetadata, ResetUploadStatus, GetTreeViewMedia, ClearDirectoryMetadata, SetSelectedItems, GetFilterFields, AddFilterTag, RemoveFilterTag, ClearFilterTags, ApplyFilters, ShowFilters, HideFilters
} from './media.action';
import { tap, map } from "rxjs/operators";
import { MediaService } from "../../../core/services/business/media/media.service";
import { MediaItem } from "../../../core/models/entity/media";
import { GetMedia as GetMedia } from './media.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';
import { MediaItemDetailsService } from '../../media-item/media-item-details/media-item-details.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { DirectoryService } from 'src/app/core/services/business/directory/directory.service';
import { DisplayToastMessage, ShowSpinner, HideSpinner } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';
import { FiltersService } from 'src/app/core/services/business/filters/filters.service';
import { Tag } from 'src/app/core/models/entity/tag';

export class MediaStateModel {
  media: MediaItem[];
  treeviewMedia: MediaItem[];
  currentMediaItemId: any;
  currentMediaItem: MediaItem;
  metadata: FieldConfiguration[];
  itemFields: FieldConfiguration[];
  directories: any[];
  favorites: MediaItem[];
  historyItems: any[];
  totalMedia: number;
  mediaTreeData: MediaTreeGrid[];
  currentItemMetadata: any[];
  directoryMetadata: any[];
  documents: any[]
  uploadComplete: boolean;
  selectedItems: any[];

  // filters state
  filterFields: any[];
  filterTags: Tag[];
  showFilters: boolean;
  isFilterApplied: boolean;
}

const initialMediaItem: MediaItem = {
  id: '',
  name: '',
  directoryId: 0,
  directoryName: '',
  directoryParentId: 0,
  directoryParentName: '',
  type: '',
  size: 0,
  storageType: '',
  entityType: '',
  entityId: '',
  documentTypeCode: '',
  url: '',
  thumbnail: '',
  createdOn: new Date(),
  createdBy: '',
  modifiedOn: new Date(),
  modifiedBy: ''
};

const initialTags: Tag[] = [
  {
    name: 'Platform',
    value: 'Ursa'
  },
  {
    name: 'Countries',
    value: 'Canada'
  }
]

@State<MediaStateModel>({
  name: 'media',
  defaults: {
    media: [],
    treeviewMedia: [],
    currentMediaItemId: null,
    currentMediaItem: null,
    directories: [],
    favorites: [],
    historyItems: [],
    totalMedia: 0,
    mediaTreeData: [],
    metadata: [],
    currentItemMetadata: [],
    itemFields: [],
    documents: [],
    directoryMetadata: [],
    uploadComplete: false,
    selectedItems: [],

    // filters state
    filterFields: [],
    filterTags: [],
    showFilters: false,
    isFilterApplied: false
  }
})

export class MediaState {

  //#region S E L E C T O R S

  @Selector()
  static getFavorites(state: MediaStateModel) {
    return state.favorites;
  }

  @Selector()
  static getCurrentItemId(state: MediaStateModel) {
    return state.currentMediaItemId;
  }

  @Selector()
  static getHistory(state: MediaStateModel) {
    return state.historyItems;
  }

  @Selector()
  static getMedia(state: MediaStateModel) {
    return state.media.filter(x => x.id);
  }

  @Selector()
  static getTreeViewMedia(state: MediaStateModel) {
    return state.treeviewMedia;
  }

  @Selector()
  static getCurrentMediaItem(state: MediaStateModel) {
    return state.currentMediaItem;
  }

  @Selector()
  static getUploadCompleteStatus(state: MediaStateModel) {
    return state.uploadComplete;
  }

  @Selector()
  static getTotalMedia(state: MediaStateModel) {
    return state.totalMedia;
  }

  @Selector()
  static getMediaItemId(state: MediaStateModel) {
    return state.currentMediaItemId;
  }

  @Selector()
  static getMetaData(state: MediaStateModel) {
    return state.metadata;
  }

  @Selector()
  static getMediaTreeData(state: MediaStateModel) {
    return state.mediaTreeData;
  }

  @Selector()
  static getCurrentItemMetadata(state: MediaStateModel) {
    return state.currentItemMetadata.sort(x => x.order);
  }

  @Selector()
  static getItemFields(state: MediaStateModel) {
    return state.itemFields.sort(x => x.order);
  }

  @Selector()
  static getDirectories(state: MediaStateModel) {
    return state.directories;
  }

  @Selector()
  static getDirectoryMetadata(state: MediaStateModel) {
    return state.directoryMetadata;
  }

  @Selector()
  static getDocuments(state: MediaStateModel) {
    return state.documents;
  }

  @Selector()
  static getSelectedItems(state: MediaStateModel) {
    return state.selectedItems;
  }

  // filters

  @Selector()
  static getFilterFields(state: MediaStateModel) {
    return state.filterFields;
  }

  @Selector()
  static getFilterTags(state: MediaStateModel) {
    return state.filterTags;
  }

  @Selector()
  static showFilters(state: MediaStateModel) {
    return state.showFilters;
  }

  @Selector()
  static isFiltersApplied(state: MediaStateModel) {
    return state.isFilterApplied;
  }


  //#endregion

  constructor(private mediaService: MediaService,
    private mediaItemDetailsService: MediaItemDetailsService,
    private mediaUploadService: MediaUploadService,
    private directoryService: DirectoryService,
    private filtersService: FiltersService,
    private dateService: DateService) { }

  //#region A C T I O N S

  @Action(GetMedia)
  getMedia(ctx: StateContext<MediaStateModel>, { pageNumber, pageSize }: GetMedia) {
    const state = ctx.getState();
    const isFilterApplied = state.isFilterApplied;
    if (isFilterApplied) {
      ctx.dispatch(new ApplyFilters(pageNumber, pageSize));
    } else {
      return this.mediaService.getMedia(pageNumber, pageSize).pipe(
        tap(response => {
          if (!response) return;
          let media = response.data;
          media.map(item => {
            item.modifiedOnString = this.dateService.formatToString(item.modifiedOn, 'MMM DD, YYYY');
          });
          const state = ctx.getState();
          ctx.setState({
            ...state,
            media: media,
            totalMedia: response.pagination.total
          });
          ctx.dispatch(new HideSpinner());
        }, err => {
          ctx.dispatch(new HideSpinner());
          ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
        })
      );
    }
  }

  @Action(GetTreeViewMedia)
  getTreeViewMedia(ctx: StateContext<MediaStateModel>, { pageNumber, pageSize }: GetTreeViewMedia) {
    return this.mediaService.getMedia(1, 100, true).pipe(
      tap(response => {
        if (!response) return;

        let media = response.data;
        media.map(item => {
          item.modifiedOnString = this.dateService.formatToString(item.modifiedOn, 'MMM DD, YYYY');
        });
        const state = ctx.getState();
        ctx.setState({
          ...state,
          treeviewMedia: media,
          totalMedia: response.pagination.total
        });
        ctx.dispatch(new HideSpinner());
      }, err => {
        ctx.dispatch(new HideSpinner());
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
  }

  @Action(GetMediaItem)
  getItem({ getState, setState }: StateContext<MediaStateModel>, { id }: GetMediaItem) {
    return this.mediaService.getMediaItem(id).pipe(
      tap(item => {
        const state = getState();
        setState({
          ...state,
          currentMediaItem: item
        });
      })
    );
  }

  @Action(GetMediaItemDetails)
  getItemDetails(ctx: StateContext<MediaStateModel>, { id }: GetMediaItemDetails) {
    return this.mediaService.getMediaItem(id).pipe(
      tap(async item => {
        console.log('MediaState - getItemDetails item: ', item);
        if (!item) return;
        await this.mediaItemDetailsService.getMetadaFields(item).then(metadata => {
          console.log('MediaState metadata: ', metadata);
          const state = ctx.getState();
          const itemFields = metadata.filter(x => x.value);
          metadata.map(x => {
            if (x.value) {
              x.isChecked = true;
            }
          })
          ctx.setState({
            ...state,
            currentMediaItem: item,
            currentItemMetadata: metadata,
            itemFields: itemFields
          });
        });
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
  }

  @Action(ClearMediaItemMetadata)
  clearItemMetadata(ctx: StateContext<MediaStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentItemMetadata: [],
      itemFields: []
    });
  }

  @Action(CreateMediaItem)
  createItem(ctx: StateContext<MediaStateModel>, { payload }: CreateMediaItem) {
    return this.mediaService.createMediaItem(payload).pipe(
      map(item => {
        console.log('MediaState createItem: ', item);
        const state = ctx.getState();
        ctx.dispatch(new HideSpinner());
        ctx.dispatch(new DisplayToastMessage(`Media Item successfully uploaded!`));
        ctx.setState({
          ...state,
          uploadComplete: true
        });
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
  }

  @Action(ResetUploadStatus)
  resetUploadStatus(ctx: StateContext<MediaStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      uploadComplete: false
    });
  }

  @Action(ClearDirectoryMetadata)
  clearDirectoryMetadata(ctx: StateContext<MediaStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      directoryMetadata: []
    });
  }

  @Action(UpdateMediaItem)
  updateItem(ctx: StateContext<MediaStateModel>, { id, payload }: UpdateMediaItem) {
    return this.mediaService.updateMediaItem(id, payload).pipe(
      tap(item => {
        ctx.dispatch(new DisplayToastMessage(`Details updated successfully.`));
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
  }

  @Action(SetCurrentMediaItemId)
  setCurrentMediaItemId({ getState, setState }: StateContext<MediaStateModel>, { id }: SetCurrentMediaItemId) {
    const state = getState();
    setState({
      ...state,
      currentMediaItemId: id
    })
  }

  @Action(GetFavorites)
  getFavorites({ getState, setState }: StateContext<MediaStateModel>) {
    return this.mediaService.getMedia().pipe(
      tap(media => {
        const state = getState();
      })
    );
  }

  @Action(ToggleFavorite)
  toggleFavorite({ getState, setState }: StateContext<MediaStateModel>, { id, payload }: ToggleFavorite) { }

  @Action(GetHistory)
  getHistory({ getState, setState }: StateContext<MediaStateModel>, { id }: GetHistory) {
    return this.mediaService.getHistory(id).pipe(tap(media => {
      const state = getState();
      setState({
        ...state,
        historyItems: media
      });
    }));
  }

  @Action(GetMediaTreeData)
  getMediaTreeData({ getState, setState }: StateContext<MediaStateModel>, ) {
    return this.mediaService.getMediaTreeData().pipe(
      tap(media => {
        const state = getState();
        console.log('media', media);
        setState({
          ...state,
          mediaTreeData: media,
        });
      })
    );
  }

  @Action(GetDirectories)
  getDirectories({ getState, setState }: StateContext<MediaStateModel>) {
    return this.directoryService.getDirectories().pipe(
      tap(directories => {
        const state = getState();
        setState({
          ...state,
          directories: directories
        });
      })
    );
  }

  @Action(GetDirectoryMetadata)
  async getDirectoryMetadata({ getState, setState }: StateContext<MediaStateModel>, { id }: GetDirectoryMetadata) {
    await this.mediaUploadService.getDirectoryMetadata(id).then(metadata => {
      console.log('MediaState getDirectoryMetadata: ', metadata);
      const state = getState();
      setState({
        ...state,
        directoryMetadata: metadata
      });
    });
  }

  @Action(AddMediaItemField)
  addItemField({ getState, setState }: StateContext<MediaStateModel>, { payload }: AddMediaItemField) {
    const state = getState();
    let itemFields = state.itemFields;
    itemFields.push(payload);
    let itemMetadata = state.currentItemMetadata;
    itemMetadata.map(x => {
      if (x.name === payload.name) {
        x.isChecked = true;
        x.isSelected = false;
      }
    });
    setState({
      ...state,
      currentItemMetadata: itemMetadata,
      itemFields: itemFields
    });
  }

  @Action(RemoveMediaItemField)
  removeItemField({ getState, setState }: StateContext<MediaStateModel>, { name }: RemoveMediaItemField) {
    const state = getState();
    let itemFields = state.itemFields;
    itemFields = itemFields.filter(x => x.name !== name);
    let itemMetadata = state.currentItemMetadata;
    itemMetadata.map(x => {
      if (x.name === name) {
        x.isChecked = false;
        x.isSelected = false;
      }
    });
    setState({
      ...state,
      itemFields: itemFields
    })
  }

  @Action(SetSelectedItems)
  addSelectedItem({ getState, setState }: StateContext<MediaStateModel>, { selectedItems }: SetSelectedItems) {
    const state = getState();
    setState({
      ...state,
      selectedItems: selectedItems,
    });
  }

  @Action(ShowFilters)
  showFilters({ getState, setState }: StateContext<MediaStateModel>) {
    const state = getState();
    setState({
      ...state,
      showFilters: true
    });
  }

  @Action(HideFilters)
  hideFilters({ getState, setState }: StateContext<MediaStateModel>) {
    const state = getState();
    setState({
      ...state,
      showFilters: false
    });
  }

  @Action(GetFilterFields)
  getFilterFields(ctx: StateContext<MediaStateModel>) {
    return this.filtersService.getFilterFields()
      .then(async fields => {
        console.log('MediaState getFilterFields: ', fields);
        const state = ctx.getState();
        ctx.setState({
          ...state,
          filterFields: fields
        });
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      }
      );
  }

  @Action(AddFilterTag)
  addFilterTag({ getState, setState }: StateContext<MediaStateModel>, { name, value }: AddFilterTag) {
    const state = getState();
    let tag: Tag = {
      name: name,
      value: value
    };
    let tags = state.filterTags;
    if (tags.includes(tag)) return;
    tags = [...tags, tag];
    setState({
      ...state,
      filterTags: tags
    });
  }

  @Action(RemoveFilterTag)
  removeFilterTag({ getState, setState }: StateContext<MediaStateModel>, { name, value }: RemoveFilterTag) {
    const state = getState();
    let tags = state.filterTags;
    let tag: Tag = {
      name: name,
      value: value
    };
    console.log('MediaState removeFilterTag: ', tag);
    tags = tags.filter(x => (x.name !== name || x.value !== value));
    console.log('MediaState removeFilterTag: ', tags);
    if (tags.length > 0) {
      setState({
        ...state,
        filterTags: tags
      });
    } else {
      setState({
        ...state,
        isFilterApplied: false,
        filterTags: tags
      });
    }
  }

  @Action(ClearFilterTags)
  clearFilterTag({ getState, setState }: StateContext<MediaStateModel>) {
    const state = getState();
    setState({
      ...state,
      isFilterApplied: false,
      filterTags: []
    });
  }

  @Action(ApplyFilters)
  applyFilters(ctx: StateContext<MediaStateModel>, { pageNumber, pageSize }: ApplyFilters) {
    const state = ctx.getState();
    const tags = state.filterTags;
    if (tags.length < 1) {
      ctx.dispatch(new HideSpinner());
      return;
    }
    return this.filtersService.applyFilters(tags, pageNumber, pageSize).pipe(
      tap(response => {
        if (!response) return;
        let media = response.data;
        media.map(item => {
          item.modifiedOnString = this.dateService.formatToString(item.modifiedOn, 'MMM DD, YYYY');
        });
        ctx.setState({
          ...state,
          isFilterApplied: true,
          media: media,
          totalMedia: response.pagination.total
        });
        ctx.dispatch(new HideSpinner());
        ctx.dispatch(new HideFilters());
      }, (err) => {
        ctx.dispatch(new HideSpinner());
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
  }

  //#endregion
}
