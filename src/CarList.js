import React from 'react';
import CarItem from './CarItem';

function CarList({ cars, deleteCar, editCar }) {
  return (
    <div>
      {cars.map((car) => (
        <CarItem key={car.id} car={car} deleteCar={deleteCar} editCar={editCar} />
      ))}
    </div>
  );
}

export default CarList;
