import { IGroup } from '../';

enum Sex {
  female = 'female',
  male = 'male',
}

export default interface IStudent {
  id: number;
  name: string;
  email: string;
  sex: Sex;
  avatar: string;
  birth_date: string;
  birth_place: string;
  groups: IGroup[];
}

export interface IStudentFormValues {
  avatar: string;
  name: string;
  email: string;
  sex: string;
  group_ids: number[] | string;
  birth_date: Date | null;
  birth_place: string;
}
