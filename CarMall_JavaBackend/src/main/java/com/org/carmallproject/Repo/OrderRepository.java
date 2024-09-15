package com.org.carmallproject.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.carmallproject.Entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{

}
