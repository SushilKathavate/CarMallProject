package com.org.carmallproject.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.carmallproject.Entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {}