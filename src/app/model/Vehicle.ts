import {Loc} from "../panics/panics.component";

export interface Vehicle {
  driverId : number;
  vehicleType: number;
  model: string;
  licenseNumber: string;
  currentLocation: Loc;
  passengerSeats: number;
  babyTransport: boolean;
  petTransport: boolean;
}
