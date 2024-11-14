import React, { useState } from 'react';

function CarForm({ addCar }) {
  const [car, setCar] = useState({ model: '', year: '' });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!car.model || !car.year) return;
    addCar(car);
    setCar({ model: '', year: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="model"
        value={car.model}
        onChange={handleChange}
        placeholder="Model"
      />
      <input
        type="text"
        name="year"
        value={car.year}
        onChange={handleChange}
        placeholder="Year"
      />
      <button type="submit">Add Car</button>
    </form>
  );
}

export default CarForm;
