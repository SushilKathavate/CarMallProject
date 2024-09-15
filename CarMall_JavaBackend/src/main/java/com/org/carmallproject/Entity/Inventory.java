package com.org.carmallproject.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="InventoryId")
    private int Inventoryid;
    
    @Column(name="carid")
    private int carId;
    
    @Column(name="branchid")
    private int branchId;
    
    @Column(name="quantity")
    private int quantity;
    
    public Inventory() {}
    
	public Inventory(int Inventoryid, int carId, int branchId, int quantity) {
		super();
		this.Inventoryid = Inventoryid;
		this.carId = carId;
		this.branchId = branchId;
		this.quantity = quantity;
	}

	public int getInventoryId() {
		return Inventoryid;
	}

	public void setId(int Inventoryid) {
		this.Inventoryid = Inventoryid;
	}

	public int getCarId() {
		return carId;
	}

	public void setCarId(int carId) {
		this.carId = carId;
	}

	public int getBranchId() {
		return branchId;
	}

	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}