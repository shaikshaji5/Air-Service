const cds = require('@sap/cds');
module.exports = cds.service.impl(async function () {
  const { AIRPORTS } = this.entities;

  // Derived region field
  this.after('READ', AIRPORTS, (rows) => {
    rows.forEach(row => {
      row.region = `${row.country}-${row.state}`;
    });
  });

  // Allow CREATE at runtime
  this.on('CREATE', AIRPORTS, async (req) => {
    if (!req.data._key) req.data._key = cds.utils.uuid();
    return await cds.tx(req).run(INSERT.into(AIRPORTS).entries(req.data));
  });
  //Enable CORS
  cds.on('bootstrap', app => {
    const cors = require('cors');
    app.use(cors()); // enable CORS for all routes
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