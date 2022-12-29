import {Location1, PassengerEmail} from "../panics/panics.component";

export interface Ride{
  id: number;
  estimatedTimeInMinutes: number;
  startTime : string;
  endTime : string;
  totalCost : number;
  babyTransport: boolean;
  petTransport: boolean;
  splitFare:boolean;
  status: string;
  passengers: PassengerEmail[];
  locations:Location1[];
}



