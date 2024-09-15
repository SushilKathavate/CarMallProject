package com.org.carmallproject.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.carmallproject.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}