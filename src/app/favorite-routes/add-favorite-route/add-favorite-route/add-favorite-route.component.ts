import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup, FormArray} from '@angular/forms';
import {Router} from "@angular/router";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import * as L from "leaflet";
import {LatLng, LatLngBounds} from "leaflet";
import { MapService } from 'src/app/service/map/map.service';
import { Ride } from 'src/app/model/Ride';
import { StorageService } from 'src/app/service/storage/storage.service';
import {FavoriteRouteSend } from '../../favorite-routes/favorite-routes.component';
import { FavoriteRoutesService } from 'src/app/service/favorite-routes/favorite-routes.service';

@Component({
  selector: 'app-add-favorite-route',
  templateUrl: './add-favorite-route.component.html',
  styleUrls: ['./add-favorite-route.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class AddFavoriteRouteComponent {
  dep!: LatLng;
  dest!: LatLng;
  map!: any;
 date!: string;
 pet!: any;
 baby!:any;
 vehicleType!: string;
 currentDate = new Date().toISOString().slice(0, -8);
 scheduleDate!: any;
 passengers!: [any];
 ride!: Ride;
 name!: any;

 constructor(private _formBuilder: FormBuilder, private router: Router, private mapService: MapService, private storageService: StorageService, private favoriteRoutesService: FavoriteRoutesService) {}

ngOnInit(): void {
this.initMap();
this.secondFormGroup = new FormGroup({
  passenger: new FormArray([
  new FormGroup({
    email: new FormControl('')
    })
  ])
});
}


  secondFormGroup!: FormGroup;

  
  //inicijalizacija polja u form group
  firstFormGroup = this._formBuilder.group({
    departure: new FormControl(),
    destination: new FormControl(),
    vehicleType: [1],
    petTransport: [true],
    babyTransport: [true],
    favoriteName: [''],
  });
  


  secondClick() {
    const passList = this.secondFormGroup.get('passenger') as FormArray;
    this.passengers = passList.value;
    /*
    console.log(passList.value);
    passList.controls.forEach(element => {
      console.log(element.value.email);
      this.passengers.push(element.value.email);
    });
    */
    console.log(this.passengers);
    this.passengers.forEach(element => {
      console.log(element.email);
    });
  }

  locations() {
    /*
    try {
      	this.initLocations();
    } catch (err) {
      alert(err)
    }
    */
    this.initLocations();
  }


  firstClick() {
    console.log("click");
    //this.initLocations();
   // console.log(this.firstFormGroup.value.departure);
    //console.log(this.firstFormGroup.value.destination);
    console.log(this.scheduleDate);
    this.baby = this.firstFormGroup.value.babyTransport;
    console.log(this.baby);
    this.pet = this.firstFormGroup.value.petTransport;
    console.log(this.pet);
    if (this.firstFormGroup.value.vehicleType == 2) {
        this.vehicleType = "KOMBI";
    }
    else if (this.firstFormGroup.value.vehicleType == 1) {
      this.vehicleType = "LUKSUZNO";
    }
    else {
      this.vehicleType ="STANDARD;"
    }
    console.log(this.firstFormGroup.value.vehicleType);
    this.name = this.firstFormGroup.value.favoriteName;
    this.submit();
  }

  async check() {
    if(this.dest!=undefined){
      this.refreshMap();
    }
    if (this.firstFormGroup.valid) {
      await this.initLocations();
      this.route(this.dep,this.dest);
    }
  }

  private async initLocations() {
    const dep1 = await this.search(this.firstFormGroup.value.departure);
    this.dep = new LatLng(Number(dep1[0].lat), Number(dep1[0].lon));
    console.log(this.dep);
    const dest1 = await this.search(this.firstFormGroup.value.destination);
    this.dest = new LatLng(Number(dest1[0].lat), Number(dest1[0].lon));
    console.log(this.dest);
    this.route(this.dep, this.dest);
  }





  //map initialisation
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

  private refreshMap(): void{
    this.map.remove();
    this.initMap();
  }
  //searching the address on map from input string

  async search(input: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mapService.search(input).subscribe({
        next: (result) => {
          console.log(result);
          L.marker([result[0].lat, result[0].lon])
            .addTo(this.map)
            .bindPopup(result[0].display_name)
            .openPopup();
          resolve(result);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  //inverse search (from click to location)
  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      let address = coord.display_name;
      this.mapService.reverseSearch(lat, lng).subscribe( async (res) => {
        address = res.display_name;
        this.firstFormGroup.controls.destination.setValue(address);
        new L.Marker([lat, lng]).addTo(this.map).bindPopup(res.display_name)
          .openPopup();
      });
      if (this.dep === undefined && this.dest === undefined) {
        this.dest = new LatLng(lat, lng);
        this.dep = new LatLng( 45.2453708, 19.8477573);
        this.firstFormGroup.controls.departure.setValue("Vasa trenutna lokacija");
      }
      else {
        this.dest = new LatLng(lat, lng);
      }
      this.refreshMap();
      this.route(this.dep, this.dest);

    });
  }

  //drawing a route
  route(r1: any, r2: any): void {
    L.Routing.control({
      waypoints: [
        r1, r2
      ]
    }).addTo(this.map);
    console.log(r1);
    console.log(r2);
  }


  //setting the map pin icon
  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconSize: [40, 40],
      iconAnchor: [13, 41],
      iconUrl: 'https://img.icons8.com/fluency/512/map-pin.png',
    });
    //this.initMap();
  }

  //refreshing the map

  


  get passenger(): FormArray {
    return this.secondFormGroup.get('passenger') as FormArray;
  }

  addPassenger() {
    this.passenger.push(
      new FormGroup({
        email: new FormControl('')
      })
    );
  }


  //potvrda svih formi
  async submit() {
    let locationSet = this.getLocations();
    let passengerSet = this.getPassengers();
    let obj: FavoriteRouteSend;
    obj = {
        "locations": locationSet,
        "passengers": passengerSet,
        "vehicleType": this.vehicleType,
        "babyTransport": this.baby,
        "petTransport": this.pet,
        "favoriteName": this.name
      };
    console.log("obj");
    console.log(obj);

    const newRide = this.favoriteRoutesService.createFavRide(obj).subscribe({
      next: (result) => {
        console.log(result);
        alert("Favorite route successfully created!");
        this.router.navigate(['passenger/favorite-routes']);
      },
      error: (error) => {
        if (error.error.message==undefined){
          alert(error.error);
        } else {
          alert(error.error.message);
        }
      },
    });
    console.log(newRide);
   console.log('hi');
  }


  getLocations(){
    let locationSet = [];
    let departure = this.getDeparture();
    let destination = this.getDestination();
    let locations: Location1 = {
        departure: departure,
        destination: destination
    };
    locationSet.push(locations);
    return locationSet;
  }

  getDeparture() {
    let departure: Loc = {
      address: this.firstFormGroup.value.departure,
      latitude: this.dep.lat,
      longitude: this.dep.lng
    }
    return departure;
  }

  getDestination() {
    let destination: Loc = {
      address: this.firstFormGroup.value.destination,
      latitude: this.dest.lat,
      longitude: this.dest.lng
    }
    return destination;
  }

  getPassengers() {
    let passengerSet = Array();
    let passenger: PassengerEmail
    passenger = {
      id: this.storageService.getUser().id,
      email: this.storageService.getUser().email
    }
    passengerSet.push(passenger);
    return passengerSet;
  }
}


export interface RideRec {
  passengers: PassengerEmail[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
  locations: Location1[];
  scheduledTime?: string;
}

export interface PassengerEmail {
  id: number
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


