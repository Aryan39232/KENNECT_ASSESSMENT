import React, { useEffect, useState } from 'react';
import { getClinics } from '../services/api';
import styles from './ClinicList.module.css';

const ClinicList = ({ onSelectClinic }) => {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    getClinics()
      .then((data) => setClinics(data))
      .catch((error) => console.error('Error fetching clinics:', error));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Select a Clinic</h2>
      {clinics.length === 0 ? (
        <p className={styles.noClinics}>No clinics available</p>
      ) : (
        <div className={styles.listContainer}>
          <ul className={styles.list}>
            {clinics.map((clinic) => (
              <li key={clinic._id} className={styles.listItem}>
                <button
                  onClick={() => onSelectClinic(clinic)}
                  className={styles.button}
                >
                  {clinic.name} - {clinic.address}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClinicList;
