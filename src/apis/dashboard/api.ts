import { currentVersion, appAxios } from '../constant';

export const API_DASHBOARD = {
  GET_DASHBOARD_STATS: `${currentVersion}/dashboards`,
};

export default class DashboardAPI {
  static getDashboardStats = (params?: any) =>
    appAxios.get(API_DASHBOARD.GET_DASHBOARD_STATS, { params });
}
