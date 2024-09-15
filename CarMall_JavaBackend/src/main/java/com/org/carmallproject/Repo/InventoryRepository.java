package com.org.carmallproject.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.carmallproject.Entity.Car;
import com.org.carmallproject.Entity.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Integer>{

	Inventory findByCarIdAndBranchId(int carId, int branchId);

}
