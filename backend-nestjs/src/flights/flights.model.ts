export interface Flight {
    id ?: number;
    origin: string;
    destination: string;
    depart: Date;
    arrive: Date;
    nonstop: boolean;
    flightNumber:number
};