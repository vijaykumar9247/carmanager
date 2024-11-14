import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../CarList.css';
const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuth();

  const fetchCars = useCallback(async () => {
    try {
      const url = searchTerm
        ? `https://carmanagment.onrender.com/api/cars/search?keyword=${searchTerm}`
        : 'https://carmanagment.onrender.com/api/cars/getcars';

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("cars data: ", data);
      setCars(data);
    } catch (err) {
      console.error('Failed to fetch cars:', err);
    }
  }, [searchTerm, token]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await fetch(`https://carmanagment.onrender.com/api/cars/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        fetchCars();
      } catch (err) {
        console.error('Failed to delete car:', err);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cars List</h2>
        
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search cars..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {car.images && car.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${car.title} image ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
            <p className="text-gray-600 mb-2">{car.description}</p>
            <p className="text-gray-600 mb-2">Dealer: {car.tags.dealer}</p>
            <p className="text-gray-600 mb-2">Company: {car.tags.company}</p>
            <p className="text-gray-600 mb-4">Type: {car.tags.car_type}</p>
            
            <div className="flex justify-between">
              <Link
                to={`/edit-car/${car._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(car._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
