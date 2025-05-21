import React, { useState, useEffect } from 'react';
import { getAvailableDoctors, bookAppointment } from '../services/api';
import Select from 'react-select';
import styles from './AppointmentForm.module.css';
//done
function AppointmentForm({ clinic, patientId, onBack, onAppointmentBooked }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const timeSlots = generateThreeHourSlots();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (date && time) {
      const timeSlot = `${date}T${time}:00Z`;
      getAvailableDoctors(clinic._id, timeSlot).then(setDoctors).catch(console.error);
    }
  }, [date, time, clinic._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timeSlot = `${date}T${time}:00Z`;
    const appointmentData = { patient_id: patientId, clinic_id: clinic._id, time_slot: timeSlot };
    if (selectedDoctor) appointmentData.doctor_id = selectedDoctor;
    try {
      await bookAppointment(appointmentData);
      alert('Appointment booked successfully!');
      onAppointmentBooked();
    } catch (error) {
      alert('Failed to book appointment: ' + error.message);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const doctorOptions = filteredDoctors.map((doctor) => ({
    value: doctor._id,
    label: doctor.name,
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Book Appointment</h2>
      <h4 className={styles.subHeading}>{clinic.name}</h4>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={styles.input}
            min={today}
          />
        </label>
        <label className={styles.label}>
          Time:
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className={styles.input}
            disabled={!date}
          >
            <option value="">Select Time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          Doctor:
          <div className={styles.reactSelectContainer}>
            <Select
              value={doctorOptions.find(option => option.value === selectedDoctor)}
              onChange={(option) => setSelectedDoctor(option ? option.value : '')}
              options={doctorOptions}
              isClearable
              placeholder="Any Available"
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: '100%',
                }),
              }}
            />
          </div>
        </label>
        <button type="submit" className={styles.bookButton}>
          Book Appointment
        </button>
        <button
          type="button"
          onClick={onBack}
          className={styles.backButton}
        >
          Back
        </button>
      </form>
    </div>
  );
}

function generateThreeHourSlots() {
  const slots = [];
  for (let hour = 0; hour < 24; hour += 3) {
    const hh = hour.toString().padStart(2, '0');
    slots.push(`${hh}:00`);
  }
  return slots;
}

export default AppointmentForm;
