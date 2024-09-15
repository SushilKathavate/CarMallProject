package com.org.carmallproject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.org.carmallproject.Entity.Role;
import com.org.carmallproject.Entity.User;
import com.org.carmallproject.Repo.RoleRepository;
import com.org.carmallproject.Repo.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        // Fetch and validate the single role from the repository
        Role role = roleRepository.findById(user.getRole().getRoleId())
            .orElseThrow(() -> new RuntimeException("Role not found: " + user.getRole().getRoleId()));
        
        user.setRole((Role)Set.of(role));
        return userRepository.save(user);
    }


    public User updateUser(int id, User user) {
        // Ensure the user exists
        User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found: " + id));
        
        // Update user details
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setActive(user.isActive());

        // Update the single role
        Role role = roleRepository.findById(user.getRole().getRoleId())
            .orElseThrow(() -> new RuntimeException("Role not found: " + user.getRole().getRoleId()));
        
        existingUser.setRole((Role) Set.of(role));
        return userRepository.save(existingUser);
    }


    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}
