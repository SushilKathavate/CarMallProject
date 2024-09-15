package com.org.carmallproject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.org.carmallproject.Entity.Branch;
import com.org.carmallproject.Repo.BranchRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }

    public Optional<Branch> getBranchById(int id) {
        return branchRepository.findById(id);
    }

    public Branch createBranch(Branch branch) {
        return branchRepository.save(branch);
    }

    public Branch updateBranch(int id, Branch branch) {
        branch.setbranchid(id);
        return branchRepository.save(branch);
    }

    public void deleteBranch(int id) {
        branchRepository.deleteById(id);
    }
}
