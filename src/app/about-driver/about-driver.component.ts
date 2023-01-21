import {Component, ViewChild} from '@angular/core';
import {Driver} from "../model/Driver";
import {FormBuilder, Validators} from "@angular/forms";
import {DriverService} from "../service/driver/driver.service";
import {DocumentService} from "../service/document/document.service";
import {VehicleService} from "../service/vehicle/vehicle.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {DriverDocument} from "../model/DriverDocument";
import {MatPaginator} from "@angular/material/paginator";
import {Vehicle} from "../model/Vehicle";

@Component({
  selector: 'app-about-driver',
  templateUrl: './about-driver.component.html',
  styleUrls: ['./about-driver.component.css']
})
export class AboutDriverComponent {
  driver!:Driver;
  vehicle!:Vehicle;
  documents!:DriverDocument[];
  id: any;
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

  constructor(private _formBuilder: FormBuilder, private driverService: DriverService,
              private documentService: DocumentService,
              private vehicleService: VehicleService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id = id;
      this.driverService.getDriver(id).subscribe(driver => {
        this.driver = driver;
        this.firstFormGroup.controls.name.setValue(driver.name);
        this.firstFormGroup.controls.surname.setValue(driver.surname);
        this.firstFormGroup.controls.email.setValue(driver.email);
        this.firstFormGroup.controls.telephoneNumber.setValue(driver.telephoneNumber);
        this.firstFormGroup.controls.address.setValue(driver.address);
        console.log(driver);
      });
      this.driverService.getVehicleForDriver(id).subscribe(vehicle => {
        this.vehicle = vehicle;
        this.secondFormGroup.patchValue(this.vehicle);
        this.secondFormGroup.value.babyTransport = vehicle.babyTransport;
        this.secondFormGroup.value.petTransport = vehicle.petTransport;
        console.log(this.vehicle);
      });
      this.driverService.getDocumentsForDriver(id).subscribe(documents => {
        this.documents = documents;
        this.dataSource.data = documents;
        console.log(this.documents);
      });

    });

  }

  //tabela sa dokumentima
  displayedColumns: string[] = ['id', 'name', 'documentImage'];
  dataSource = new MatTableDataSource<DriverDocument>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

const ELEMENT_DATA: DriverDocument[] = [];
