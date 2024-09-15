
package com.org.carmallproject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.org.carmallproject.Entity.Branch;
import com.org.carmallproject.Entity.Car;
import com.org.carmallproject.Entity.Inventory;
import com.org.carmallproject.Entity.Order;
//import com.org.carmallproject.Entity.OrderRequest;
import com.org.carmallproject.Entity.Transaction;
import com.org.carmallproject.Repo.BranchRepository;
import com.org.carmallproject.Repo.CarRepository;
import com.org.carmallproject.Repo.InventoryRepository;
import com.org.carmallproject.Repo.OrderRepository;
import com.org.carmallproject.Repo.TransactionRepository;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;




@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private BranchRepository branchRepository;
    
    @Autowired
    private InventoryRepository inventoryRepository;
    
    public Order placeOrder(int carId, int userId, int branchId, LocalDate startDate, LocalDate endDate, boolean isPurchase) {
        // Fetch the car details
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        
        Inventory inventory = inventoryRepository.findByCarIdAndBranchId(carId, branchId);
        
        if (inventory ==null ) {
        	throw new RuntimeException("Inventory not found");
        }
        
        if(inventory.getQuantity()<=0 && isPurchase) {
        	throw new RuntimeException("Out of Stock");
        }
        
        
        // Create and set up the order
        Order order = new Order();
        order.setCarId(carId);
        order.setUserId(userId);
        order.setStartDate(startDate);
        order.setEndDate(endDate);
        order.setPurchase(isPurchase);  // Directly use the parameter

        // Fetch and set the branch details
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("Branch not found"));
        order.setBranch(branch);

        // Calculate the amount based on the order type (purchase or rental)
        double amount;
        if (isPurchase) {
            // Set amount to purchase price if it’s a purchase
            amount = car.getPurchasePrice();
            
            inventory.setQuantity(inventory.getQuantity()-1);
        } else {
            // Ensure start and end dates are provided for rental
            if (startDate == null || endDate == null) {
                throw new IllegalArgumentException("Start date and end date must be provided for rentals.");
            }
            int rentalDays = (int) Duration.between(startDate.atStartOfDay(), endDate.atStartOfDay()).toDays();
            if (rentalDays < 0) {
                throw new IllegalArgumentException("End date cannot be before start date.");
            }
            amount = rentalDays * car.getPricePerDay();
        }

        // Save the order to the repository
        orderRepository.save(order);
        inventoryRepository.save(inventory);
        // Create and save the transaction
        Transaction transaction = new Transaction();
        transaction.setOrder(order);  // Associate the entire Order object with the transaction
        transaction.setAmount(amount);  // Set the calculated amount
        transaction.setTransactionDate(LocalDate.now());  // Set the transaction date to today
        transactionRepository.save(transaction);

        return order;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(int id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order updateOrder(int id, Order order) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        order.setOrderId(id);
        return orderRepository.save(order);
    }

    public void deleteOrder(int id) {
        orderRepository.deleteById(id);
    }
}
