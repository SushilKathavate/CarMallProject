using carManagement.Data;
using carManagement.Interface;
using carManagement.Models;
using System.Collections.Generic;
using System.Linq;

namespace carManagement.Services
{
    public class BranchService : IBranch
    {
        private readonly ApplicationDbContext _context;

        public BranchService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Branch> GetAllBranches()
        {
            return _context.Branch.ToList();
        }

        public Branch GetBranchById(int id)
        {
            var branch = _context.Branch.Find(id);
            if (branch == null)
            {
                throw new KeyNotFoundException("Branch not found");
            }
            return branch;
        }

        public void CreateBranch(Branch branch)
        {
            _context.Branch.Add(branch);
            _context.SaveChanges();
        }

        public void UpdateBranch(Branch branch)
        {
            var existingBranch = _context.Branch.Find(branch.BranchId);
            if (existingBranch == null)
            {
                throw new KeyNotFoundException("Branch not found");
            }

            // Update properties here
            existingBranch.BranchName = branch.BranchName;
            existingBranch.Location = branch.Location;
            // Add any other properties that need to be updated

            _context.Branch.Update(existingBranch);
            _context.SaveChanges();
        }

        public void DeleteBranch(int id)
        {
            var branch = _context.Branch.Find(id);
            if (branch == null)
            {
                throw new KeyNotFoundException("Branch not found");
            }

            _context.Branch.Remove(branch);
            _context.SaveChanges();
        }
    }
}

