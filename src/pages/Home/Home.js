import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header/Header";
import Button from "../../components/ui/Button/Button";
import Modal from "../../components/ui/Modal/Modal";
import FormInput from "../../components/ui/FormInput/FormInput";
import FormSelect from "../../components/ui/FormSelect/FormSelect";
import { categories } from "../../lib/categoriesData";
import { Plus, Edit } from "feather-icons-react";
import TransactionItem from "../../components/ui/TransactionItem/TransactionItem";
import styles from "./Home.module.scss";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    id: null,
    amount: '',
    category: categories[0],
    name: '',
    date: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditing, setIsEditing] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTransactions(prev => prev.map(t => t.id === newTransaction.id ? newTransaction : t));
    } else {
      const transactionWithId = { ...newTransaction, id: Date.now() };
      setTransactions(prev => [...prev, transactionWithId]);
    }
    resetForm();
  };

  const handleEditTransaction = (transaction) => {
    setNewTransaction(transaction);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setNewTransaction({ id: null, amount: '', category: categories[0], name: '', date: '' });
    setIsEditing(false);
    closeModal();
  };

  const filteredTransactions = transactions
    .filter(transaction =>
      selectedCategory === 'all' || transaction.category === selectedCategory
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getUniqueCategories = () => {
    return [...new Set(transactions.map(t => t.category))];
  };

  return (
    <>
      <Header />
      <section className={styles.container}>
        <div className={styles.homeContent}>

          {/* Header */}
          <div className={styles.homeContentHeader}>
            <div>
              <span>Your Balance</span>
              <h1>{transactions.reduce((sum, t) => sum + Number(t.amount), 0).toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</h1>
            </div>
            <div className={styles.homeContentHeaderRight}>
              <Button onClick={openModal}>
                <Plus size={20} />
                <span> Add Transaction</span>
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className={styles.homeContentContainer}>
            <div className={styles.homeContentContainerHeader}>
              <h2>Transactions</h2>
              <div>
                <div className={styles.categoriesFilter}>
                  <Button onClick={() => setSelectedCategory('all')} transparent={selectedCategory !== 'all'}>All</Button>
                  {getUniqueCategories().map((category) => (
                    <Button key={category} onClick={() => setSelectedCategory(category)} transparent={selectedCategory !== category}>
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={handleEditTransaction}
                />
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>No transactions yet. Click "Add Transaction" to get started.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Add/Edit Transaction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={isEditing ? "Edit Transaction" : "Add Transaction"}
        description={isEditing ? "Edit your transaction details." : "Add your transaction details."}
      >
        <form onSubmit={handleAddTransaction} className={styles.modalForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGridItem}>
              <FormInput label="Amount" type="number" name="amount" value={newTransaction.amount} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGridItem}>
              <FormSelect label="Category" name="category" value={newTransaction.category} onChange={handleInputChange} options={categories} required />
            </div>
            <div className={styles.formGridItem}>
              <FormInput label="Name" type="text" name="name" value={newTransaction.name} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGridItem}>
              <FormInput label="Date" type="date" name="date" value={newTransaction.date} onChange={handleInputChange} required />
            </div>
          </div>
          <Button type="submit" className={styles.modalFormButton}>
            {isEditing ? <><Edit size={20} /> Update Transaction</> : <><Plus size={20} /> Add Transaction</>}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default HomePage;
