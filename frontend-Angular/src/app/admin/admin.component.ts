import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight.model';
import { FlightsService } from '../flights.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    loading = true;
    origin!: string;
    destination!: string;
    depart!: Date;
    arrive!: Date;
    nonstop!: boolean;
    flightNumber!: number;
    flightList!: any[];

  constructor(private flightService: FlightsService) { }

  toggleNonStop() {
    this.nonstop = !this.nonstop;
  }
  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.flightService.getAllFlights().subscribe(data => {
      this.flightList = data;
      this.loading = false;
    })
  }

  sendFlight() {
    const flight: Flight = {
      origin: this.origin,
      destination: this.destination,
      depart: this.depart,
      arrive: this.arrive,
      nonstop: this.nonstop,
      flightNumber:this.flightNumber
    }
    this.flightService.postFlight(flight).subscribe(data => {
      //if (data && data['origin']) {
        this.refresh();
      //}
    });
  }

  update(flight: Flight) {
    this.flightService.updateFlight(flight).subscribe(data => {
     // if (data && data['affected']) {
        this.refresh();
     // }
    });
  }

  delete(flight: Flight) {
    if (window.confirm('Are you sure you want to delete this flight? ')) {
      this.flightService.deleteFlight(flight.id).subscribe(data => {
      //  if (data && data['affected']) {
          this.refresh();
       // }
      });
    }
  }

}
