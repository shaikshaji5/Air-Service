using { airport as db } from '../db/schema';

service AirportService {
  entity Airports as projection on db.AIRPORTS;
}
