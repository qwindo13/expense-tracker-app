import React from 'react';
import { motion } from "framer-motion"
import styles from './Button.module.scss';

const Button = ({ children, onClick, type, disabled, className, transparent, noPadding }) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      className={`${styles.button} ${transparent ? styles.transparent : ''} ${noPadding ? styles.noPadding : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;  
