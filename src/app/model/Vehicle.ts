import {Location1} from "../panics/panics.component";

export interface Vehicle {
  vehicleType: number;
  model: string;
  licenseNumber: string;
  location: Location1;
  passengerSeats: number;
  babyTransport: boolean;
  petTransport: boolean;
}
