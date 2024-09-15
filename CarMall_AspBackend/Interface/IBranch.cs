using carManagement.Models;

namespace carManagement.Interface
{
    public interface IBranch
    {
        IEnumerable<Branch> GetAllBranches();
        Branch GetBranchById(int id);
        void CreateBranch(Branch branch);
        void UpdateBranch(Branch branch);

        void DeleteBranch(int id);
    }
}
