import React from 'react';
import { motion, AnimatePresence } from "framer-motion"
import Button from '../Button/Button';
import styles from './Modal.module.scss';

const Modal = ({ children, title, description, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className={styles.modalContent}>
                <div className={styles.modalContentHeader}>
                  <div>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <p className={styles.modalDescription}>{description}</p>
                  </div>
                  <Button transparent noPadding onClick={onClose}>&times;</Button>
                </div>
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
