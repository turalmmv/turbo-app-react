import React, { useState, useEffect } from 'react';
import './CarList.css';

const CarList = ({ token }) => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:8080/car/get-all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Car data:', data); // Log the data to see its structure
          setCars(data);
        } else {
          setError('Failed to fetch cars.');
        }
      } catch (error) {
        setError('Failed to fetch cars.');
      }
    };

    if (token) {
      fetchCars();
    }
  }, [token]);

  return (
    <div>
      <h2>Car List</h2>
      {error && <p>{error}</p>}
      <ul className="car-list">
        {cars.map((car, index) => (
          <li key={index} className="car-item">
            <h3>Car {index + 1}</h3>
            <div className="car-item-container">
              <div className="car-item-detail"><strong>City:</strong> {car.city || 'N/A'}</div>
              <div className="car-item-detail"><strong>Mark:</strong> {car.mark || 'N/A'}</div>
              <div className="car-item-detail"><strong>Model:</strong> {car.model || 'N/A'}</div>
              <div className="car-item-detail"><strong>Graduation Year:</strong> {car.graduationYear || 'N/A'}</div>
              <div className="car-item-detail"><strong>Ban Type:</strong> {car.banType || 'N/A'}</div>
              <div className="car-item-detail"><strong>Color:</strong> {car.color || 'N/A'}</div>
              <div className="car-item-detail"><strong>Engine:</strong> {car.engine || 'N/A'}</div>
              <div className="car-item-detail"><strong>Odometer:</strong> {car.odometer || 'N/A'}</div>
              <div className="car-item-detail"><strong>Gearbox:</strong> {car.gearbox || 'N/A'}</div>
              <div className="car-item-detail"><strong>Transmitter:</strong> {car.transmitter || 'N/A'}</div>
              <div className="car-item-detail"><strong>Is It New:</strong> {car.isItNew ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Number of Owners:</strong> {car.numberOfOwners || 'N/A'}</div>
              <div className="car-item-detail"><strong>Number of Seats:</strong> {car.numberOfSeats || 'N/A'}</div>
              <div className="car-item-detail"><strong>Situation:</strong> {car.situation || 'N/A'}</div>
              <div className="car-item-detail"><strong>Region:</strong> {car.region || 'N/A'}</div>
              <div className="car-item-detail"><strong>Credit:</strong> {car.credit ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Barter:</strong> {car.barter ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Alloy Wheels:</strong> {car.alloyWheels ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>ABS:</strong> {car.abs ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Hatch:</strong> {car.hatch ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Rain Sensor:</strong> {car.rainSensor ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Central Locking:</strong> {car.centralLocking ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Park Radar:</strong> {car.parkRadar ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Air Conditioning:</strong> {car.airConditioning ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Seat Heating:</strong> {car.seatHeating ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Leather Salon:</strong> {car.leatherSalon ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Xenon Lamps:</strong> {car.xenonLamps ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Rear View Camera:</strong> {car.rearViewCamera ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Side Curtains:</strong> {car.sideCurtains ? 'Yes' : 'No'}</div>
              <div className="car-item-detail"><strong>Seat Ventilation:</strong> {car.seatVentilation ? 'Yes' : 'No'}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
