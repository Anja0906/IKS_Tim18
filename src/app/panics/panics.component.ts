import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {PanicService} from "../service/panic/panic.service";

@Component({
  selector: 'app-panics',
  templateUrl: './panics.component.html',
  styleUrls: ['./panics.component.css']
})
export class PanicsComponent {
  panics: Panic[] = [];
  totalElements: number = 0;

  constructor(private panicService: PanicService, private router: Router) {}

  ngOnInit(): void {
    this.getPanics({ page: "0", size: "10" });
  }

  //getting all panic notifications from the backend side
  private getPanics(request: { page?: string; size?: string; }) {
    this.panicService.getAll(request)
      .subscribe(data => {
          // @ts-ignore
          this.panics = data['results'];
          // @ts-ignore
          this.totalElements = data['totalCount'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  //changing page
  nextPage(event: PageEvent) {
    const request = {};
    // @ts-ignore
    request['page'] = event.pageIndex.toString();
    // @ts-ignore
    request['size'] = event.pageSize.toString();
    this.getPanics(request);
  }

}


export interface Panic {
  id: number;
  user: UserSimple;
  ride: RideRet;
  dateTime: Date;
  reason: string;
}

export interface UserSimple{
  id: number;
  name: string;
  surname : string;
  profilePicture : string;
  telephoneNumber : string;
  email: string;
  address: string;
  blocked: boolean;
}

export interface RideRet {
  id: number;
  startTime: string;
  endTime: string;
  totalCost: number;
  driver: DriverEmail;
  passengers: PassengerEmail[];
  estimatedTimeInMinutes: number;
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
  rejection: Rejection;
  locations: Location1[];
  status: string;


}

export interface DriverEmail {
  id: number;
  email: string;
}

export interface Rejection {
  reason: string;
  timeOfRejection: string;
}

export interface PassengerEmail {
  id: number;
  email: string;
}

export interface Location1 {
  departure: Loc;
  destination: Loc;
}

export interface Loc{
  address: string;
  latitude: number;
  longitude: number;
}
