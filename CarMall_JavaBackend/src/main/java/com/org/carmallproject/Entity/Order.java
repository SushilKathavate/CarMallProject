package com.org.carmallproject.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="OrderTable")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="orderid")
    private int orderid;
    
    @Column(name="userid")
    private int userId;
    
    @Column(name="carid")
    private int carId;
        
    @Column(name="startDate")
    private LocalDate startDate;
    
    @Column(name="endDate")
    private LocalDate endDate;
    
    @Column(name="isSold")
    private boolean isPurchase;

    @ManyToOne
    @JoinColumn(name = "branchid")
    private Branch branch;

    public Order() {}

    public Order(int orderid, int userId, int carId, LocalDate startDate, LocalDate endDate, boolean isPurchase,
                 Branch branch) {
        this.orderid = orderid;
        this.userId = userId;
        this.carId = carId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isPurchase = isPurchase;
        this.branch = branch;
    }

    public int getOrderId() {
        return orderid;
    }

    public void setOrderId(int orderid) {
        this.orderid = orderid;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCarId() {
        return carId;
    }

    public void setCarId(int carId) {
        this.carId = carId;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public boolean isPurchase() {
        return isPurchase;
    }

    public void setPurchase(boolean isPurchase) {
        this.isPurchase = isPurchase;
    }
}
