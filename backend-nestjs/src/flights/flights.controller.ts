import { Controller, Get, Post, Body, Put, Delete, Patch, Param  } from '@nestjs/common';
import { Flights } from './flights.entity';
import { FlightsService } from './flights.service';
import { Flight } from './flights.model';
import { identity } from 'rxjs';

@Controller('flights/')
export class FlightsController {
    constructor(private readonly flightService: FlightsService) { }

    @Post()
    async create(@Body() flight: Flight): Promise<Flights[]> {
        return this.flightService.create(flight);
    }

    // READ All
    @Get()
    findAll(): Promise<Flights[]> {
        return this.flightService.findAll();
    }

    // UNIQUE ORIGINS
    @Get("cities/origins")
     async getOrigins(): Promise<String[]> {
        return this.flightService.getFlightOrigins();
    }

    // UNIQUE DESTINATIONS
    @Get("cities/destinations")
    async getDestinations(): Promise<String[]> {
        return this.flightService.getFlightDestinations();
    }

    // QUERY
    @Get(":query/:orig/:dest")
    async query(@Param('orig') orig, @Param('dest') dest): Promise<any> {
        return this.flightService.query(orig, dest);
    }

    // READ ONE
    @Get(":id")
    async findOne(@Param() param): Promise<Flight> {
        return this.flightService.findOne(param.id);
    }

    // UPDATE
    @Post(":id/update")
    async update(@Param('id') id, @Body() flight: Flight): Promise<any> {
        flight.id = Number(id);
        return this.flightService.update(flight);
    }


    // DELETE
    @Post(":id/delete")
    async delete(@Param('id') id): Promise<any> {
        return this.flightService.delete(id);
    }
}
