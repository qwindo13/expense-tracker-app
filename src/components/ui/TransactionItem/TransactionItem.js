import { motion } from "framer-motion";
import { Edit } from "feather-icons-react"; 
import Button from "../Button/Button";
import styles from './TransactionItem.module.scss';

const TransactionItem = ({ transaction, onEdit }) => {
    return (
        <motion.div
            className={styles.transactionItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.itemDate}>
                <p>{transaction.date}</p>
            </div>
            <div className={styles.itemLeft}>
                <div className={styles.itemInfo}>
                    <h5>{transaction.name}</h5>
                    <p>{transaction.category}</p>
                </div>

            </div>
            <div className={styles.itemAmount}>
                <p className={styles.itemAmount} > {transaction.amount > 0 ? "+" : ""}{Number(transaction.amount).toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
            </div>
            <Button transparent noPadding className={styles.itemEdit} onClick={() => onEdit(transaction)} >
                <Edit size={20} />
            </Button>
        </motion.div>
    );
};

export default TransactionItem;