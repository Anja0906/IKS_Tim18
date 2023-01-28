import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import {MapService} from "../service/map/map.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LatLng} from "leaflet";
import {StorageService} from "../service/storage/storage.service";
import {DurationDistance} from "../model/DurationDistance";
import {VehiclesForMap} from "../model/VehiclesForMap";

@Component({
  selector: 'app-app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.css']
})
export class AppMapComponent implements AfterViewInit, OnInit {
  //za showForm flag je neophodno u zavisnosti od korisnika promeniti da li se forma prikazuje ili ne
  showForm = true;
  map!: any;
  flag!: boolean;
  dep!: LatLng;
  depAddress!:string;
  dest!: LatLng;
  desAddress!:string;
  time!:number;
  km!:number;
  durationDistance!:DurationDistance;

  redPin = L.icon({
    iconSize: [30, 30],
    iconAnchor: [10, 31],
    iconUrl: 'assets/redmapPin.png',
  });

  greenPin = L.icon({
    iconSize: [30, 30],
    iconAnchor: [10, 31],
    iconUrl: 'assets/greenmapPin.png',
  });

  priceForm = new FormGroup({
    departure: new FormControl(),
    destination: new FormControl(),
    price: new FormControl(),
  });
  vehiclesForMap!: VehiclesForMap;


  constructor(private mapService: MapService, private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    this.flag = true;
    if (this.storageService.getUser().roles[1] === "ROLE_ADMIN" || this.storageService.getUser().roles[1] === "ROLE_DRIVER"){
      this.showForm = false;
    }
    this.refreshMap();
  }

  hide() {
    this.showForm = false;
  }

  show() {
    this.showForm = true;
  }

  async check() {
    if(this.dest!=undefined){
      this.refreshMap();
    }
    if (this.priceForm.valid) {
      await this.initLocations();
      this.route(this.dep, this.dest);

    }
  }

  private async initLocations() {
    const dep1 = await this.search(this.priceForm.value.departure);
    this.dep = new LatLng(Number(dep1[0].lat), Number(dep1[0].lon));
    this.depAddress = dep1[0].display_name;
    console.log(this.dep);
    const dest1 = await this.search(this.priceForm.value.destination);
    this.dest = new LatLng(Number(dest1[0].lat), Number(dest1[0].lon));
    this.desAddress = dest1[0].display_name;
    console.log(this.dest);
    this.getDuration(this.depAddress, this.desAddress, this.dep, this.dest);
  }


  //map initialisation
  private initMap(): void {
    this.map = L.map('map', {
      center: [45.26044, 19.8148415],
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
    this.registerOnClick();
  }

  //refreshing the map

  private refreshMap(): void{
    this.map.remove();
    this.initMap();
    this.initVehicles();
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

  getDuration(address1:string, address2:string, departure: LatLng, destination: LatLng){
    this.mapService.getDuration(address1, address2, departure, destination).subscribe(
      (data) => { this.durationDistance = data;
        this.km = Number((data.distance/1000).toFixed(1));
        this.time = Math.round(this.durationDistance.duration/60);
        console.log(this.durationDistance);},
      (error) => { console.log(error) },
      () => { console.log("completed") }
    );
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
        new L.Marker([lat, lng]).addTo(this.map).bindPopup(res.display_name)
          .openPopup();
        if (this.dep === undefined && this.dest === undefined) {
          this.dest = new LatLng(lat, lng);
          this.dep = new LatLng( 45.2453708, 19.8477573);
          this.priceForm.controls.departure.setValue("Vasa trenutna lokacija");
        }
        else {
          if (this.flag){
            this.dep = new LatLng(lat, lng);
            this.priceForm.controls.departure.setValue(address);
            this.flag = !this.flag;
          }else {
            console.log(address);
            this.dest = new LatLng(lat, lng);
            this.priceForm.controls.destination.setValue(address);
            this.flag = !this.flag;
          }
        }
      });

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

  initVehicles(){
    this.mapService.getVehiclesForMap().subscribe(data => {
      this.vehiclesForMap = data;
      console.log(data);
      for (let vehicle of data.inUse) {
        L.marker([vehicle.currentLocation.latitude, vehicle.currentLocation.longitude], {icon: this.redPin}).addTo(this.map);
      }
      for (let vehicle of data.outOfUse) {
        L.marker([vehicle.currentLocation.latitude, vehicle.currentLocation.longitude], {icon: this.greenPin}).addTo(this.map);
      }
    });
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconSize: [40, 40],
      iconAnchor: [13, 41],
      iconUrl: 'https://img.icons8.com/fluency/512/map-pin.png',
    });
    this.initMap();
    this.initVehicles();
  }

}
