import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Driver} from "../../model/Driver";
import {environment} from "../../../environments/environment";
import {LatLng} from "leaflet";
import {Loc, Location1} from "../../panics/panics.component";
import {DurationDistance} from "../../model/DurationDistance";
import {VehiclesForMap} from "../../model/VehiclesForMap";

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  search(street: string): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }

  getDuration(address1: string, address2:string, departure: LatLng, destination: LatLng): Observable<DurationDistance>{
    let dep: Loc = { address: address1,
                      latitude: departure.lat,
                      longitude: departure.lng };
    let des: Loc = { address: address2,
      latitude: destination.lat,
      longitude: destination.lng };
    let locations: Location1 = { departure: dep, destination: des };
    return this.http.post<DurationDistance>(environment.apiHost + 'api/unregisteredUser/duration', locations);
  }

  getVehiclesForMap(): Observable<VehiclesForMap>{
    return this.http.get<VehiclesForMap>(environment.apiHost + 'api/vehicle')
  }
}
