import {AfterViewInit, Component, OnInit} from '@angular/core';
import {control, LatLng} from "leaflet";
import {FormControl, FormGroup} from "@angular/forms";
import {MapService} from "../service/map/map.service";
import {Router} from "@angular/router";
import * as L from "leaflet";
import {RideService} from "../service/ride/ride.service";
import {Ride} from "../model/Ride";
import zoom = control.zoom;
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {StorageService} from "../service/storage/storage.service";

@Component({
  selector: 'app-map-driver',
  templateUrl: './map-driver.component.html',
  styleUrls: ['./map-driver.component.css']
})
export class MapDriverComponent implements AfterViewInit, OnInit {
  showForm = true;
  map!: any;
  result!: any;
  dep!: LatLng;
  dest!: LatLng;
  ride!: Ride;

  priceForm = new FormGroup({
    departure: new FormControl(),
    destination: new FormControl(),
    price: new FormControl(),
  });


  constructor(private mapService: MapService, private router: Router, private rideService:RideService, private storageService:StorageService ) {}


  ngOnInit(): void {
    this.initMap();
    if (this.storageService.getUser().roles.includes("ROLE_DRIVER")){
      this.rideService.getActiveRide(this.storageService.getUser().id).pipe(catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            alert("Active ride does not exist!");
            this.router.navigate(['driver']);
          }
          return throwError(error);
        })).subscribe((res) =>{
            this.ride = res;
            this.dep = new LatLng(this.ride.locations[0].departure.latitude,this.ride.locations[0].departure.longitude);
            this.dest = new LatLng(this.ride.locations[0].destination.latitude,this.ride.locations[0].destination.longitude);
            this.ngAfterViewInit();
            this.route(this.dep,this.dest);
            this.map.setView([(this.dep.lat+this.dest.lat)/2,(this.dep.lng+this.dest.lng)/2],16);
      });
    } else {
        this.rideService.getActiveRideForPassenger(this.storageService.getUser().id).pipe(catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            alert("Active ride does not exist!");
            this.router.navigate(['passenger']);
          }
          return throwError(error);
        })).subscribe((res) =>{
            this.ride = res;
            this.dep = new LatLng(this.ride.locations[0].departure.latitude,this.ride.locations[0].departure.longitude);
            this.dest = new LatLng(this.ride.locations[0].destination.latitude,this.ride.locations[0].destination.longitude);
            this.ngAfterViewInit();
            this.route(this.dep,this.dest);
            this.map.setView([(this.dep.lat+this.dest.lat)/2,(this.dep.lng+this.dest.lng)/2],16);
        });
      }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2493, 19.8148],
      zoom: 15,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
  }

  route(r1: any, r2: any): void {
    L.Routing.control({
      waypoints: [
        r1, r2
      ]
    }).addTo(this.map);
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconSize: [40, 40],
      iconAnchor: [13, 41],
      iconUrl: 'https://img.icons8.com/fluency/512/map-pin.png',
    });
    L.marker([this.dep.lat,this.dep.lng]).addTo(this.map);
    L.marker([this.dest.lat,this.dest.lng]).addTo(this.map);
    this.map.refresh;
  }

}

