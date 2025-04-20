const cds = require('@sap/cds');
const { UUID } = require('@sap/cds/lib/core/classes');
module.exports = cds.service.impl(async function () {
  const { AIRPORTS } = this.entities;

  // Add a derived field 'region' after reading data
  this.after('READ', AIRPORTS, (rows) => {

    if (!Array.isArray(rows)) rows = [rows];

    rows.forEach(row => {
      if (row.country && row.state) {
        row.region = `${row.country}-${row.state}`; // Concatenate country and state
      } else {
        row.region = null; // Handle cases where country or state is missing
      }
    });
  });

  // Handler for creating a new airport
  this.on('CREATE', AIRPORTS, async (req) => {
    const {_key, icao, iata, name, city, state, country, elevation, lat, lon, tz } = req.data;

    // Validate required fields
    if (!name || !city || !state || !country) {
      return req.error(400, 'Name, city, state, and country are required fields.');
    }

    // Insert the new airport into the database
    const result = await cds.tx(req).run(
      INSERT.into(AIRPORTS).entries({
        _key  : _key,
        icao: icao || null,
        iata: iata || null,
        name,
        city,
        state,
        country,
        elevation: elevation || 0,
        lat: lat || null,
        lon: lon || null,
        tz: tz || null,
      })
    );

    // Return the newly created airport
    return { _key, icao, iata, name, city, state, country, elevation, lat, lon, tz };
  });

  //Enable CORS
  cds.on('bootstrap', app => {
    const cors = require('cors');
    app.use(cors()); // enable CORS for all routes
  });

  // this.on('calculateAverageElevation', async (req) => {
  //   const { AIRPORTS } = this.entities;

  //   // Query to calculate average elevation per country
  //   const results = await cds.tx(req).run(
  //     SELECT.from(AIRPORTS)
  //       .columns('country', { avgElevation: { func: 'avg', args: ['elevation'] } })
  //       .groupBy('country')
  //   );

  //   return results;
  // });
  this.on('avgElevationPerCountry', async () => {
    const result = await db.run(`
      SELECT country, AVG(elevation) AS avg_elevation
      FROM Airports
      WHERE elevation IS NOT NULL
      GROUP BY country
      ORDER BY avg_elevation DESC
    `);
    return result;
  });

  this.on('airportsWithoutIATA', async () => {
    const result = await db.run(`
      SELECT *
      FROM Airports
      WHERE iata_code IS NULL OR iata_code = ''
    `);
    return result;
  });

  this.on('top10Timezones', async () => {
    const result = await db.run(`
      SELECT timezone, COUNT(*) AS airport_count
      FROM Airports
      WHERE timezone IS NOT NULL
      GROUP BY timezone
      ORDER BY airport_count DESC
      LIMIT 10
    `);
    return result;
  });
  
});

module.exports = (srv) => {
  srv.after('READ', '*', (req) => {
    if (req && req.results) {
      req.results.forEach(result => {
        result.customProperty = 'Custom Value';
      });
    }
  });
};