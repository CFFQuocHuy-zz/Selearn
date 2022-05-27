export default interface IGroup {
  id: number;
  name: string;
}

interface ILeader {
  id: number;
  name: string;
  email: string;
  avatar: string;
}
export interface IGroupDetail {
  date_start: string;
  id: number;
  leader: ILeader;
  name: string;
  subject: string;
}

export interface IGroupFormValues {
  name: string;
  subject: string;
  date_start: Date | null;
  time_start: Date | null;
  leader_id?: number;
}
