package com.org.carmallproject.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="carid")
    private int carid;
    
    @Column(name="Model")
    private String model;
    
    @Column(name="brand")
    private String brand;
    
    @Column(name="pricePerDay")
    private double pricePerDay;   // Rental price per day
    
    @Column(name="PurchasePrice")
    private double purchasePrice; // Purchase price
    @Column(name="Available")
    private boolean isAvailable;

    // Getters and Setters

    public int getcarId() {
        return carid;
    }

    public void setId(int carid) {
        this.carid = carid;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
