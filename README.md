# Getting Started

Welcome to Air Service.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide

##  Local Setup Guide

### Start the CAP Server

1. Open a terminal and navigate to the project root:
   ```bash
   cd Air-Service
   ```

2. Start the CAP service:
   ```bash
   cds watch
   ```
   or
   ```bash
   cds serve
   ```

---

###  Start the UI Application

1. Open a **new terminal** and navigate to the UI folder:
   ```bash
   cd Air-Service/app/airport-ui
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the React app:
   ```bash
   npm start
   ```

---

###  Access the Applications

- **CAP Service:** [http://localhost:4004/odata/v4/airport](http://localhost:4004/odata/v4/airport)  
- **UI Application:** [http://localhost:3000](http://localhost:3000)

---

 **Note:** Ensure you have Node.js and CDS CLI installed.  
If not, install CDS globally using:
```bash
npm install -g @sap/cds
```

##  Custom Functions

These functions are exposed via the CAP backend and provide additional insights from the airport dataset.

---

###  Calculate Average Elevation per Country

**Endpoint:**
```
POST http://localhost:4004/airport/avgElevationPerCountry
```

**Description:**  
Returns the average elevation for each country.

---

###  Find Airports Without IATA Codes

**Endpoint:**
```
POST http://localhost:4004/airport/airportsWithoutIATA
```

**Description:**  
Returns a list of airports that do not have IATA codes.

---

### 🌍 Determine the Top 10 Most Common Time Zones

**Endpoint:**
```
POST http://localhost:4004/airport/top10Timezones
```

**Description:**  
Returns the 10 most common time zones and the count of airports in each.

