package com.org.carmallproject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.org.carmallproject.Entity.*;
import com.org.carmallproject.Service.OrderService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/neworder")
    public Order placeOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.placeOrder(
            orderRequest.getCarId(),
            orderRequest.getUserId(),
            orderRequest.getBranchId(),
            orderRequest.getStartDate(),
            orderRequest.getEndDate(),
            orderRequest.isPurchase()
        );
    }

    @GetMapping("/allorders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable int id) {
        return orderService.getOrderById(id);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable int id, @RequestBody Order order) {
        return orderService.updateOrder(id, order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable int id) {
        orderService.deleteOrder(id);
    }
}
