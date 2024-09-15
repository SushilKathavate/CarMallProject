package com.org.carmallproject.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="roleid")
    private int Roleid;
    
    @Column(name="RoleName")
    private String roleName;

    // Constructors, getters, and setters

    public Role() {}

    public Role(int Roleid, String roleName) {
        this.Roleid = Roleid;
        this.roleName = roleName;
    }

    public int getRoleId() {
        return Roleid;
    }

    public void setRoleId(int Roleid) {
        this.Roleid = Roleid;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
