using { airport as db } from '../db/schema';

service AirportService {
  entity Airports as projection on db.AIRPORTS;
 
  function avgElevationPerCountry() returns array of {
    country: String;
    avg_elevation: Decimal;
  };

  function airportsWithoutIATA() returns array of Airports;

  function top10Timezones() returns array of {
    timezone: String;
    airport_count: Integer;
  };
}
