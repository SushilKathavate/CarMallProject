package com.org.carmallproject.Entity;

import java.time.LocalDate;

public class OrderRequest {
    private int carId;
    private int userId;
    private int branchId;
    private LocalDate startDate;
    private LocalDate endDate;
    private static boolean isPurchase;

    // Getters and Setters
    public int getCarId() {
        return carId;
    }

    public void setCarId(int carId) {
        this.carId = carId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getBranchId() {
        return branchId;
    }

    public void setBranchId(int branchId) {
        this.branchId = branchId;
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


    public static boolean isPurchase() {
		return isPurchase;
	}

	public void setPurchase(boolean isPurchase) {
        this.isPurchase = isPurchase;
    }
}
