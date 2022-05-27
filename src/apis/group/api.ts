import { currentVersion, appAxios } from '../constant';

export const API_GROUP = {
  GET_LIST_LEADER: `${currentVersion}/users/leaders`,
  GET_LIST_GROUP: `${currentVersion}/groups`,
  CREATE_GROUP: `${currentVersion}/groups`,
  EDIT_GROUP: (id: number) => `${currentVersion}/groups/${id}`,
  GET_DETAIL_GROUP: (id: number) => `${currentVersion}/groups/${id}`,
  DELETE_GROUP: (id: number) => `${currentVersion}/groups/${id}`,
};

export default class GroupAPI {
  static getListLeader = (params?: any) => appAxios.get(API_GROUP.GET_LIST_LEADER, { params });
  static getListGroup = (params?: any) => appAxios.get(API_GROUP.GET_LIST_GROUP, { params });
  static createGroup = (body?: any) => appAxios.post(API_GROUP.CREATE_GROUP, body);
  static editGroup = (id: number) => (body?: any) => appAxios.put(API_GROUP.EDIT_GROUP(id), body);
  static getDetailGroup = (id: number) => appAxios.get(API_GROUP.GET_DETAIL_GROUP(id));
  static deleteGroup = (id: number) => appAxios.delete(API_GROUP.DELETE_GROUP(id));
}
