import React, { useState } from 'react';

function CarItem({ car, deleteCar, editCar }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCar, setEditedCar] = useState(car);

  const handleChange = (e) => {
    setEditedCar({ ...editedCar, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    editCar(editedCar);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input name="model" value={editedCar.model} onChange={handleChange} />
          <input name="year" value={editedCar.year} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <span>{car.model} ({car.year})</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteCar(car.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default CarItem;
