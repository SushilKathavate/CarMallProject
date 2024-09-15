using carManagement.Models;

namespace carManagement.Interface
{
    public interface IRole

    {
        IEnumerable<Role> GetAllRoles();
        Role GetRoleById(int id);
        void CreateRole(Role role);
        void UpdateRole(Role role);
       void DeleteRole(int id);
    }
}
