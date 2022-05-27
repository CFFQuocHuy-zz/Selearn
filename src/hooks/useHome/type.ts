import { GridSelectionModel } from '@mui/x-data-grid';
import { Dispatch } from 'react';
import { IDashboardStats, IGroup, IPaginate, IStudent } from '../../apis';

export enum HomeActions {
  ADD_ROW = 'ADD_ROW',
  REMOVE_ROW = 'REMOVE_ROW',
  CHECKED_FILTER_GROUP = 'CHECKED_FILTER_GROUP',
  SEARCH_NAME = 'SEARCH_NAME',
  SEARCH_GROUP = 'SEARCH_GROUP',
  CHANGE_TAB = 'CHANGE_TAB',
}

export enum HomeTabName {
  STUDENT_TAB = 0,
  GROUP_TAB = 1,
}

export interface IDataDashboardStats {
  data: IDashboardStats;
}

export interface IDataGroup {
  data: IGroup[];
  paginate: IPaginate;
}

export interface IDataStudent {
  data: IStudent[];
  paginate: IPaginate;
}

export interface IHomeState {
  selected: GridSelectionModel;
  group_ids: number[];
  search: string;
  searchGroup: string;
  tabValue: HomeTabName;
}

export type ActionAddRow = {
  type: HomeActions.ADD_ROW;
  payload: GridSelectionModel;
};

export type ActionRemoveRow = {
  type: HomeActions.REMOVE_ROW;
  payload: GridSelectionModel;
};

export type ActionCheckedFilterGroup = {
  type: HomeActions.CHECKED_FILTER_GROUP;
  payload: number | number[];
};

export type ActionSearchName = {
  type: HomeActions.SEARCH_NAME;
  payload: string;
};

export type ActionSearchGroup = {
  type: HomeActions.SEARCH_GROUP;
  payload: string;
};

export type ActionChangeTab = {
  type: HomeActions.CHANGE_TAB;
  payload: HomeTabName;
};

export type HomeActionType =
  | ActionAddRow
  | ActionRemoveRow
  | ActionCheckedFilterGroup
  | ActionSearchName
  | ActionSearchGroup
  | ActionChangeTab;

export interface IHomeContext {
  state: IHomeState;
  dispatch: Dispatch<HomeActionType>;
  studentData?: IDataStudent;
  groupData?: IDataGroup;
  dashboardStatsData?: IDataDashboardStats;
  handleReFetchStudent: () => void;
  handleReFetchGroup: () => void;
  handleReFetchDashboardStats: () => void;
}
