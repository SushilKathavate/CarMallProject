
package com.org.carmallproject.Entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Transactionid")
    private int transactionId;

    @ManyToOne
    @JoinColumn(name="orderid", nullable=false)
    private Order order;

    @Column(name="Amount")
    private double amount;

    @Column(name="TransactionDate")
    private LocalDate transactionDate;

    public Transaction() {}

    public Transaction(int transactionId, Order order, double amount, LocalDate transactionDate) {
        this.transactionId = transactionId;
        this.order = order;
        this.amount = amount;
        this.transactionDate = transactionDate;
    }

    // Getters and Setters
    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }
}
