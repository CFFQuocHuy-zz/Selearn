import { GridSelectionModel } from '@mui/x-data-grid';
import {
  ActionAddRow,
  HomeActions,
  ActionRemoveRow,
  ActionCheckedFilterGroup,
  ActionSearchName,
  ActionSearchGroup,
  ActionChangeTab,
  HomeTabName,
} from './type';

export const addRowAction = (payload: GridSelectionModel): ActionAddRow => ({
  type: HomeActions.ADD_ROW,
  payload,
});

export const removeRowAction = (payload: GridSelectionModel): ActionRemoveRow => ({
  type: HomeActions.REMOVE_ROW,
  payload,
});

export const checkedFilterGroup = (payload: number | number[]): ActionCheckedFilterGroup => ({
  type: HomeActions.CHECKED_FILTER_GROUP,
  payload,
});

export const searchName = (payload: string): ActionSearchName => ({
  type: HomeActions.SEARCH_NAME,
  payload,
});

export const searchGroup = (payload: string): ActionSearchGroup => ({
  type: HomeActions.SEARCH_GROUP,
  payload,
});

export const changeTabAction = (payload: HomeTabName): ActionChangeTab => ({
  type: HomeActions.CHANGE_TAB,
  payload,
});
