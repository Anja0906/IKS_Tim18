import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DriverService} from "../service/driver/driver.service";
import {Router} from "@angular/router";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Driver} from "../model/Driver";
import {DriverDocument} from "../model/DriverDocument";
import {Vehicle} from "../model/Vehicle";
import {VehicleService} from "../service/vehicle/vehicle.service";
import {DocumentService} from "../service/document/document.service";

@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.component.html',
  styleUrls: ['./register-driver.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class RegisterDriverComponent implements OnInit {
  //pocetni driver
  driver: Driver = {
    id: 1,
    name: 'John',
    surname: 'Doe',
    email: 'johndoe@example.com',
    address: '123 Main St',
    password: 'password',
    profilePicture: '',
    telephoneNumber: '555-555-5555'
  };
  //pocetno vozilo
  vehicle: Vehicle = {
    driverId : this.driver.id,
    vehicleType: 0,
    model: "",
    licenseNumber: "",
    currentLocation: {
      address : "",
      latitude : 45.0,
      longitude : 19.0
    },
    passengerSeats: 0,
    babyTransport: false,
    petTransport: false
  }
  //inicijalizacija polja u form group
  firstFormGroup = this._formBuilder.group({
    profilePicture: [''],
    name: [''],
    surname: [''],
    telephoneNumber: ['', Validators.pattern("^((\\+381[0-9]{10})|(0[0-9]{10}))$")],
    address: [''],
    email: ['', Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")],
    password: ['', Validators.pattern("^(?=.*\\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$")],
  });
  secondFormGroup = this._formBuilder.group({
    vehicleType: [1],
    model: [''],
    licenseNumber: ['', Validators.max(7)],
    passengerSeats: [0],
    petTransport: [true],
    babyTransport: [true],
  });
  thirdFormGroup = this._formBuilder.group({
    name: [''],
    documentImage: [''],
  });

  constructor(private _formBuilder: FormBuilder, private driverService: DriverService,
              private documentService: DocumentService,
              private vehicleService: VehicleService, private router: Router) {}

  ngOnInit(): void {}

  //tabela sa dokumentima
  displayedColumns: string[] = ['id', 'name', 'documentImage'];
  dataSource = new MatTableDataSource<DriverDocument>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //zahtev za dodavanje novog vozaca
  async addDriver() : Promise<Driver> {
    return new Promise((resolve, reject) => {
      this.driverService.add(this.firstFormGroup.value).subscribe({
        next: (result) => {
          console.log(result);
          resolve(result);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  //zahtev za dodavanje novog vozila
  async addVehicle() : Promise<Vehicle> {
    return new Promise((resolve, reject) => {
      this.vehicleService.add(this.secondFormGroup.value, this.driver.id).subscribe({
        next: (result) => {
          console.log(result);
          resolve(result);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  //zahtev za dodavanje novog dokumenta
  async addSingleDocument(doc: DriverDocument) : Promise<DriverDocument> {
    return new Promise((resolve, reject) => {
      this.documentService.add(doc, this.driver.id).subscribe({
        next: (result) => {
          console.log(result);
          resolve(result);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  //zahtevi za dodavanje svih novih dokumenata
  addDocument(){
    let model = {
      id: ELEMENT_DATA.length + 1,
      name: this.thirdFormGroup.controls.name.value,
      documentImage: this.thirdFormGroup.controls.documentImage.value,
      driverId: this.driver.id,
    };
    this.dataSource.data.push(<DriverDocument>model);  //add the new model object to the dataSource
    this.dataSource._updateChangeSubscription();
  }

  //potvrda svih formi
  async submit() {
    if(this.firstFormGroup.valid){
      const driverResponse = await this.addDriver();
      this.driver = Object.assign({}, driverResponse) as Driver;
      console.log(this.driver.id);
    }
    else {
      alert("First form is not valid!")
    }
    if(this.secondFormGroup.valid){
      const vehicleResponse = await this.addVehicle();
      this.vehicle = Object.assign({}, vehicleResponse) as Vehicle;
      console.log(this.vehicle);
    }
    else {
      alert("Second form is not valid!")
    }
    if(this.dataSource.data.length>0){
      for (const doc of this.dataSource.data) {
        await this.addSingleDocument(doc);
      }
    }
    else {
      alert("You need to add at least one document!")
    }
    await this.router.navigate(['admin/all-drivers']);
  }
}

const ELEMENT_DATA: DriverDocument[] = [];


