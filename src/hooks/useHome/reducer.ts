import { HomeActions, HomeActionType, IHomeState } from './type';

export function studentTabReducer(state: IHomeState, action: HomeActionType) {
  const { type, payload } = action;

  switch (type) {
    case HomeActions.ADD_ROW:
      return {
        ...state,
        selected: [...payload],
      };
    case HomeActions.REMOVE_ROW:
      return {
        ...state,
        selected: [...payload],
      };
    case HomeActions.CHECKED_FILTER_GROUP: {
      const isArray = Array.isArray(payload);
      const newChecked = isArray ? payload : [...state.group_ids];

      if (!isArray) {
        const currentIndex = state.group_ids.indexOf(payload);

        if (currentIndex === -1) {
          newChecked.push(payload);
        } else {
          newChecked.splice(currentIndex, 1);
        }
      }

      return {
        ...state,
        group_ids: newChecked,
      };
    }
    case HomeActions.SEARCH_NAME:
      return {
        ...state,
        search: payload,
      };
    case HomeActions.SEARCH_GROUP:
      return {
        ...state,
        searchGroup: payload,
      };
    case HomeActions.CHANGE_TAB:
      return {
        ...state,
        tabValue: payload,
      };
    default:
      return state;
  }
}
