import {User} from "./User";
export interface Panic{
  id: number;
  user: User;
  time : string;
  reason : number;
}

export interface PanicSocket{
  id: number;
  user: string;
  time : string;
  reason : string;
}
