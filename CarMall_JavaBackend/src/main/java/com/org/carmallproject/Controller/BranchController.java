package com.org.carmallproject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.org.carmallproject.Entity.Branch;
import com.org.carmallproject.Service.BranchService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/branches")
public class BranchController {

    @Autowired
    private BranchService branchService;

    @GetMapping("/Allbranches")
    public List<Branch> getAllBranches() {
        return branchService.getAllBranches();
    }

    @GetMapping("/{id}")
    public Optional<Branch> getBranchById(@PathVariable int id) {
        return branchService.getBranchById(id);
    }

    @PostMapping("/newbranch")
    public Branch createBranch(@RequestBody Branch branch) {
        return branchService.createBranch(branch);
    }

    @PutMapping("/{id}")
    public Branch updateBranch(@PathVariable int id, @RequestBody Branch branch) {
        return branchService.updateBranch(id, branch);
    }

    @DeleteMapping("/{id}")
    public void deleteBranch(@PathVariable int id) {
        branchService.deleteBranch(id);
    }
}
