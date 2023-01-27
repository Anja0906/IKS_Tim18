import {Location1, PassengerEmail} from "../panics/panics.component";
import {User} from "./User";
import {Ride} from "./Ride";

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
