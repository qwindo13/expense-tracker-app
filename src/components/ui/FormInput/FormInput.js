import React from 'react';
import styles from './FormInput.module.scss'; 

const FormInput = ({ label, type, name, value, onChange, placeholder, error, errorMessage, required }) => {
  return (
    <div className={styles.formInput}>
      {label && <label className={styles.label} htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default FormInput;