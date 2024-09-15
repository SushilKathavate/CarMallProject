package com.org.carmallproject.Entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Userid")
    private int Userid;
    
    @Column(name="username")
    private String username;
    
    @Column(name="Password")
    private String password;
    
    @Column(name="isActive")
    private boolean isActive;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @JsonManagedReference 
    private Role role;

    // Constructors, getters, and setters

    public User() {}

    public User(int Userid, String username, String password, boolean isActive, Role role) {
        this.Userid = Userid;
        this.username = username;
        this.password = password;
        this.isActive = isActive;
        this.role = role;
    }

    public int getUserId() {
        return Userid;
    }

    public void setUserId(int Userid) {
        this.Userid = Userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

	
}
