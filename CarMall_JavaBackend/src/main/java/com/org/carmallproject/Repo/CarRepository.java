package com.org.carmallproject.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.carmallproject.Entity.Car;

public interface CarRepository extends JpaRepository<Car, Integer> {
}