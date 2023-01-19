import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DriverService} from "../service/driver/driver.service";
import {Router} from "@angular/router";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Driver} from "../model/Driver";

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

  driver!:Driver;
  firstFormGroup = this._formBuilder.group({
    profilePicture: [''],
    name: [''],
    licence: [''],
    surname: [''],
    vehicleRegistration: [''],
    telephoneNumber: [''],
    address: [''],
    email: [''],
    password: [''],
  });
  secondFormGroup = this._formBuilder.group({
    selectedOption: [1],
    model: [''],
    licenseNumber: [''],
    numberOfSeats: [''],
    petTransport: [true],
    babyTransport: [true],
  });
  thirdFormGroup = this._formBuilder.group({
    documentName: [''],
    picture: [''],
  });

  constructor(private _formBuilder: FormBuilder, private driverService: DriverService, private router: Router) {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //submitting form and adding driver on the backend side
  add(): Promise<Driver> {
    return new Promise((resolve) => {
      if (this.firstFormGroup.valid) {
        this.driverService
          .add(this.firstFormGroup.value)
          .subscribe((res: Driver) => {
            this.driver = res;
            resolve(this.driver);
          });
      }
    });
  }

  submit(){
    this.add()
      .then((driver) => {
        // console.log(driver.id);
        this.driver = driver;
        console.log(driver);
        console.log(driver.address);
      });
    console.log(this.driver);
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

