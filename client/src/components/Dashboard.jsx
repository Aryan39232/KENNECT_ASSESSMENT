// Dashboard.jsx
import React, { useState } from 'react';
import ClinicList from './ClinicList';
import AppointmentForm from './AppointmentForm';
import PatientAppointments from './PatientAppointments';

const styles = {
  container: {
    padding: '30px 25px',
    maxWidth: '900px',
    margin: '40px auto',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    backgroundColor: '#fafafa',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontWeight: '700',
    fontSize: '1.8rem',
  },
  logoutBtn: {
    display: 'block',
    margin: '30px auto 0',
    padding: '12px 30px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 3px 8px rgba(231, 76, 60, 0.5)',
    transition: 'background-color 0.3s ease',
  },
  logoutBtnHover: {
    backgroundColor: '#c0392b',
  },
};

function Dashboard({ patient }) {
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [refreshAppointments, setRefreshAppointments] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);

  const handleBack = () => {
    setSelectedClinic(null);
  };

  const handleAppointmentBooked = () => {
    setRefreshAppointments((prev) => !prev);
    setSelectedClinic(null); 
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Appointment Booking Dashboard</h1>
      {!selectedClinic ? (
        <ClinicList onSelectClinic={setSelectedClinic} />
      ) : (
        <AppointmentForm
          clinic={selectedClinic}
          patientId={patient.id}
          onBack={handleBack}
          onAppointmentBooked={handleAppointmentBooked}
        />
      )}
      {patient && <PatientAppointments patientId={patient.id} refresh={refreshAppointments} />}
      <button
        onClick={() => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('patient');
          window.location.href = '/login';
        }}
        style={logoutHover ? { ...styles.logoutBtn, ...styles.logoutBtnHover } : styles.logoutBtn}
        onMouseEnter={() => setLogoutHover(true)}
        onMouseLeave={() => setLogoutHover(false)}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
