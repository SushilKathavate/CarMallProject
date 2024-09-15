package com.org.carmallproject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.org.carmallproject.Entity.Role;
import com.org.carmallproject.Repo.RoleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;


    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }


    public Optional<Role> getRoleById(int id) {
        return roleRepository.findById(id);
    }


    public Role createRole(Role role) {
        // Check if the role already exists
        if (roleRepository.existsById(role.getRoleId())) {
            throw new RuntimeException("Role already exists: " + role.getRoleId());
        }
        return roleRepository.save(role);
    }


    public Role updateRole(int id, Role role) {
        if (!roleRepository.existsById(id)) {
            throw new RuntimeException("Role not found: " + id);
        }
        role.setRoleId(id); // Ensure the ID is set correctly
        return roleRepository.save(role);
    }


    public void deleteRole(int id) {
        if (!roleRepository.existsById(id)) {
            throw new RuntimeException("Role not found: " + id);
        }
        roleRepository.deleteById(id);
    }
}
