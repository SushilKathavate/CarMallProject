package com.org.carmallproject.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.carmallproject.Entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer>{

//	Optional<Transaction> findById(int id);

}
