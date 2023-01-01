import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import {MapService} from "../service/map/map.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LatLng} from "leaflet";

@Component({
  selector: 'app-app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.css']
})
export class AppMapComponent implements AfterViewInit, OnInit {
  map!: any;
  result!: any;
  dep!: LatLng;
  dest!: LatLng;

  priceForm = new FormGroup({
    departure: new FormControl(),
    destination: new FormControl(),
    price: new FormControl(),
  });


  constructor(private mapService: MapService, private router: Router) {}

  ngOnInit(): void {}

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
    console.log(this.dep);
    const dest1 = await this.search(this.priceForm.value.destination);
    this.dest = new LatLng(Number(dest1[0].lat), Number(dest1[0].lon));
    console.log(this.dest);
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
    this.registerOnClick();
  }

  //refreshing the map

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
        this.priceForm.controls.destination.setValue(address);
        new L.Marker([lat, lng]).addTo(this.map).bindPopup(res.display_name)
          .openPopup();
      });
      if (this.dep === undefined && this.dest === undefined) {
        this.dest = new LatLng(lat, lng);
        this.dep = new LatLng( 45.2453708, 19.8477573);
        this.priceForm.controls.departure.setValue("Vasa trenutna lokacija");
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
    this.initMap();
  }

}
