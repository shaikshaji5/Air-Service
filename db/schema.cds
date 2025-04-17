namespace airport;

entity AIRPORTS {
  key _key     : UUID;
      icao     : String;
      iata     : String;
      name     : String;
      city     : String;
      state    : String;
      country  : String;
      elevation: Integer;
      lat      : Decimal(9,6);
      lon      : Decimal(9,6);
      tz       : String;
}