import { debounce } from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { useFetch } from '..';
import {
  API_DASHBOARD,
  API_GROUP,
  API_STUDENT,
  DashboardAPI,
  GroupAPI,
  StudentAPI,
} from '../../apis';
import {
  addRowAction,
  changeTabAction,
  checkedFilterGroup,
  removeRowAction,
  searchGroup as searchGroupAction,
  searchName,
} from './action';
import { studentTabReducer } from './reducer';
import { HomeTabName, IDataDashboardStats, IDataGroup, IDataStudent, IHomeContext } from './type';

const initialState = {
  selected: [],
  group_ids: [],
  search: '',
  searchGroup: '',
  tabValue: HomeTabName.STUDENT_TAB,
};

const initialContext = {
  state: {
    selected: [],
    group_ids: [],
    search: '',
    searchGroup: '',
    tabValue: HomeTabName.STUDENT_TAB,
  },
  studentData: undefined,
  groupData: undefined,
  dashboardStatsData: undefined,
  dispatch: () => {},
  handleReFetchStudent: () => {},
  handleReFetchGroup: () => {},
  handleReFetchDashboardStats: () => {},
};

const HomeContext = createContext<IHomeContext>(initialContext);

export const HomeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(studentTabReducer, initialState);

  const {
    state: { data: studentData },
    handleReFetch: handleReFetchStudent,
  } = useFetch<IDataStudent>({
    url: API_STUDENT.GET_LIST_STUDENT,
    api: StudentAPI.getListStudent,
    params: useMemo(
      () => ({
        group_ids: state.group_ids,
        search: state.search,
      }),
      [state.group_ids, state.search],
    ),
  });

  const {
    state: { data: groupData },
    handleReFetch: handleReFetchGroup,
  } = useFetch<IDataGroup>({
    url: API_GROUP.GET_LIST_GROUP,
    api: GroupAPI.getListGroup,
    params: useMemo(
      () => ({
        search: state.searchGroup,
      }),
      [state.searchGroup],
    ),
  });

  const {
    state: { data: dashboardStatsData },
    handleReFetch: handleReFetchDashboardStats,
  } = useFetch<IDataDashboardStats>({
    url: API_DASHBOARD.GET_DASHBOARD_STATS,
    api: DashboardAPI.getDashboardStats,
    params: useMemo(() => ({}), []),
  });

  return (
    <HomeContext.Provider
      value={useMemo(
        () => ({
          state,
          dispatch,
          studentData,
          groupData,
          dashboardStatsData,
          handleReFetchStudent,
          handleReFetchGroup,
          handleReFetchDashboardStats,
        }),
        [state, dispatch, studentData, groupData],
      )}
    >
      {children}
    </HomeContext.Provider>
  );
};

const useHome = () => {
  const {
    state: { selected, group_ids, search, searchGroup, tabValue },
    studentData,
    groupData,
    dashboardStatsData,
    dispatch,
    handleReFetchStudent,
    handleReFetchGroup,
    handleReFetchDashboardStats,
  } = useContext(HomeContext);

  const handleAddRow = useCallback((newRow: GridSelectionModel) => {
    dispatch(addRowAction(newRow));
  }, []);

  const handleRemoveRow = useCallback((newRow: GridSelectionModel) => {
    dispatch(removeRowAction(newRow));
  }, []);

  const handleCheckedFilterGroup = useCallback((groupd_id: number | number[]) => {
    dispatch(checkedFilterGroup(groupd_id));
  }, []);

  const handleSearchName = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchName(event.target.value));
    }, 600),
    [],
  );

  const handleSearchGroup = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchGroupAction(event.target.value));
    }, 600),
    [],
  );

  const handleChangeTab = useCallback((tabValue: HomeTabName) => {
    dispatch(changeTabAction(tabValue));
  }, []);

  return {
    studentData,
    groupData,
    selected,
    group_ids,
    handleAddRow,
    handleRemoveRow,
    handleCheckedFilterGroup,
    handleSearchName,
    handleReFetchStudent,
    handleSearchGroup,
    search,
    searchGroup,
    handleReFetchGroup,
    tabValue,
    handleChangeTab,
    dashboardStatsData,
    handleReFetchDashboardStats,
  };
};

export default useHome;
