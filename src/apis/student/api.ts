import { currentVersion, appAxios } from '../constant';

export const API_STUDENT = {
  GET_LIST_STUDENT: `${currentVersion}/users`,
  CREATE_STUDENT: `${currentVersion}/users`,
  EDIT_STUDENT: (id: number) => `${currentVersion}/users/${id}`,
  DELETE_STUDENT: (id: number) => `${currentVersion}/users/${id}`,
};

export default class StudentAPI {
  static getListStudent = (params?: any) => appAxios.get(API_STUDENT.GET_LIST_STUDENT, { params });
  static createStudent = (body?: any) => appAxios.post(API_STUDENT.CREATE_STUDENT, body);
  static editStudent = (id: number) => (body?: any) =>
    appAxios.put(API_STUDENT.EDIT_STUDENT(id), body);
  static deleteStudent = (id: number) => appAxios.delete(API_STUDENT.DELETE_STUDENT(id));
}
