import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Header.module.scss";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header>
            <div className={styles.headerContent}>
                <Link to="#">
                    <img src="/images/logo.svg" alt="logo" height={48} width={48} />
                </Link>
                <div className={styles.headerRight} onClick={toggleDropdown}>
                    <img src="/images/avatar.png" alt="avatar" height={40} width={40} />
                    <span>Miew</span>
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                className={styles.dropdownMenu}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ul>
                                    <li><a onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Header;