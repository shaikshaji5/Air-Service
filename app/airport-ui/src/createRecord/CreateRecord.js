import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateAirportForm() {
  const [formData, setFormData] = useState({
    name: '', city: '', state: '', country: '',
    elevation: '', icao: '', iata: '', lat: '', lon: '', tz: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4004/odata/v4/airport/Airports', formData);
      setSubmitted(true);
      setTimeout(() => navigate('/'), 1500); // Auto-redirect after 1.5s
    } catch (error) {
      console.error('Error creating airport:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Airport</h1>
        <button
          onClick={() => navigate('/')}
          className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          ← Back to Home
        </button>
      </header>

      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4">
          ✅ Airport created successfully! Redirecting...
        </div>
      )}

      <form
        className="bg-white shadow-md rounded p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'name', 'city', 'state', 'country',
            'elevation', 'icao', 'iata', 'lat', 'lon', 'tz'
          ].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize mb-1">
                {field}
              </label>
              <input
                name={field}
                type={field === 'elevation' ? 'number' : 'text'}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Airport
        </button>
      </form>
    </div>
  );
}
