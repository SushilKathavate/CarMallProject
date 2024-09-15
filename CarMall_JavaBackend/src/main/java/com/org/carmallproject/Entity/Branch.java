package com.org.carmallproject.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="branchid")
    private int branchid;
    
    @Column(name="branchName")
    private String name;
    
    @Column(name="Location")
    private String location;
    
    public Branch() {}
    
	public Branch(int branchid, String name, String location) {
		super();
		this.branchid = branchid;
		this.name = name;
		this.location = location;
	}
	public int getbranchId() {
		return branchid;
	}
	public void setbranchid(int branchid) {
		this.branchid = branchid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}

    
}