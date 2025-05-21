import React, { useState, useEffect } from 'react';
import { getPatientAppointments } from '../services/api';
import styles from './PatientAppointments.module.css';

function PatientAppointments({ patientId, refresh }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (patientId) {
      getPatientAppointments(patientId).then(setAppointments).catch(console.error);
    }
  }, [patientId, refresh]);

  return (
    <div className={styles.container}>
  <h2 className={styles.heading}>Your Appointments</h2>
  {appointments.length === 0 ? (
    <p className={styles.emptyState}>No appointments booked yet.</p>
  ) : (
    <div className={styles.scrollContainer}>
      <ul className={styles.list}>
        {appointments.map((appointment) => (
          <li key={appointment._id} className={styles.listItem}>
            <div className={styles.appointmentInfo}>
              Clinic: {appointment.clinic_id.name} &nbsp; | &nbsp;
              Doctor: {appointment.doctor_id.name}
            </div>
            <div className={styles.appointmentDetails}>
              Time: {new Date(appointment.time_slot).toLocaleString()} <br />
              Status: {appointment.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
}

export default PatientAppointments;
