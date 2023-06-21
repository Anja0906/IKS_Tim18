import { Component } from '@angular/core';
import {Chart} from 'chart.js/auto';
import {Report} from "../model/Report";
import {ReportsService} from "../service/reports/reports.service";
import {StorageService} from "../service/storage/storage.service";
import {DatePipe} from "@angular/common";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  public chart!: object;
  public chart2!: object;
  public chart1!: object;

  id!: string;

  report!: Report;
  moneySum ="";
  totalKilometers ="";
  averageMoney ="";

  showStats = false;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private reportService:ReportsService, private storageService:StorageService, private route: ActivatedRoute) {
  }

  initCards(report: Report){
    this.moneySum = "" + report.moneySum;
    this.totalKilometers = "" +  report.totalKilometers;
    this.averageMoney = "" + report.averageMoney;
    this.createChart1(report);
    this.createChart2(report);
    this.createChart3(report);
  }

  createChart1(report:Report){
    console.log(report);
    this.chart = new Chart("MyChart2", {
      type: 'line',
      data: {
        labels: Object.keys(report.ridesPerDay),
        datasets: [
          {
            label: "Rides per day",
            data: Object.values(report.ridesPerDay),
            backgroundColor: '#485162'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }


  createChart2(report:Report){
    console.log(report);
    this.chart1 = new Chart("MyChart3", {
      type: 'bar',
      data: {
        labels: Object.keys(report.ridesPerDay),
        datasets: [
          {
            label: "Kilometers per day",
            data: Object.values(report.kilometersPerDay),
            backgroundColor: '#DC7C36'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  createChart3(report:Report){
    console.log(report);
    this.chart2 = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: Object.keys(report.ridesPerDay),
        datasets: [
          {
            label: "Costs per day",
            data: Object.values(report.moneyPerDay),
            backgroundColor: '#BFDC36'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  submitDates() {
    const startValue = this.range.controls.start.value;
    const endValue = this.range.controls.end.value;
    if (startValue && endValue){
      this.route.params.subscribe(params => {
        this.id = params['id'];
        if (this.id === "0") {
          this.admin(startValue, endValue)
        }
        else {
          console.log(typeof params['id']);
          this.users(this.id, startValue, endValue)
        }
      });
    }
  }

  users(id:string, startValue:Date, endValue:Date){
    this.reportService.getReportsForUser(Number(this.id), {
      page: "0",
      size: "100",
      from: this.convertToString(startValue),
      to: this.convertToString(endValue)
    }).subscribe({
      next: (result) => {
        this.initCards(result)
      }
    });
    this.showStats = true;
  }

  admin(startValue:Date, endValue:Date){
    this.reportService.getReportsForAdmin({
      page: "0",
      size: "100",
      from: this.convertToString(startValue),
      to: this.convertToString(endValue)
    }).subscribe({
      next: (result) => {
        this.initCards(result)
      }
    });
    this.showStats = true;
  }





  convertToString(date: Date){
    const datePipe: DatePipe = new DatePipe('en-US')
    return datePipe.transform(date, 'YYYY-MM-ddTHH:mm:ss')
  }
}
