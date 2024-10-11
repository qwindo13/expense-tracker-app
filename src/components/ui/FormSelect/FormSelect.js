import React from 'react';
import styles from './FormSelect.module.scss';

const FormSelect = ({ label, name, value, onChange, options, required = false, placeholder = "Select an option" }) => {
  return (
    <div className={styles.formSelect}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange} required={required}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
