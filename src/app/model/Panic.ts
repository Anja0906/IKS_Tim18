import {Location1, PassengerEmail} from "../panics/panics.component";
import {User} from "./User";
import {Ride} from "./Ride";

export interface Panic{
  id: number;
  user: User;
  ride : Ride;
  time : string;
  reason : number;
}
