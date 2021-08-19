import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { Flights } from './flights/flights.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '112233',
            database: 'transportation',
            entities: [Flights],
            synchronize: true,
        }),
        FlightsModule,
    ], controllers:[AppController],
})
export class AppModule {}
