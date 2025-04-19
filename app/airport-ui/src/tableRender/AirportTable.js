import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../sap-theme.css';

export default function AirportTable() {
  const [airports, setAirports] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchAirports();
  }, [sortField, sortOrder, filter]);

  const fetchAirports = async () => {
    try {
      //connect to the OData service
      const response = await axios.get('http://localhost:4004/odata/v4/airport/Airports');
      let data = response.data.value;

      if (filter) {
        data = data.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()));
      }

      data.sort((a, b) => {
        const aVal = a[sortField]?.toLowerCase?.() || '';
        const bVal = b[sortField]?.toLowerCase?.() || '';
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });

      setAirports(data);
    } catch (error) {
      console.error('Error fetching airports:', error);
    }
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="p-4">
      
      <h1 className="text-xl font-bold mb-4">Airports</h1>

      <input
        type="text"
        placeholder="Filter by name..."
        className="border p-2 mb-4 w-full"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <table className="w-full border">
        <thead>
          <tr>
            {['name', 'city', 'state', 'country', 'elevation'].map(field => (
              <th
                key={field}
                className="cursor-pointer border p-2"
                onClick={() => toggleSort(field)}
              >
                {field.toUpperCase()} {sortField === field ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {airports.map((airport, idx) => (
            <tr
              key={idx}
              className={
                airport.elevation > 8000
                  ? 'bg-red-100 text-red-900'
                  : 'bg-white'
              }
            >
              <td className="border p-2">{airport.name}</td>
              <td className="border p-2">{airport.city}</td>
              <td className="border p-2">{airport.state}</td>
              <td className="border p-2">{airport.country}</td>
              <td className="border p-2">{airport.elevation}</td>
              <td className="border p-2">{airport.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
