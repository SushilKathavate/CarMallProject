using carManagement.Data;
using carManagement.Interface;
using carManagement.Models;
using System.Collections.Generic;
using System.Linq;

namespace carManagement.Services
{
    public class RoleService : IRole
    {
        private readonly ApplicationDbContext _context;

        public RoleService(ApplicationDbContext context)
        {
            _context = context;
        }

        IEnumerable<Role> IRole.GetAllRoles()
        {
            return _context.Role.ToList();
        }

        Role IRole.GetRoleById(int id)
        {
            var role = _context.Role.Find(id);
            if (role == null)
            {
                throw new KeyNotFoundException("Role not found");
            }
            return role;
        }

        void IRole.CreateRole(Role role)
        {
            // Fetch users from the database based on the IDs in the role input
            var users = role.Users.Select(user => _context.User.Find(user.UserId)).Where(u => u != null).ToHashSet();
            role.Users = users;

            _context.Role.Add(role);
            _context.SaveChanges();
        }

        void IRole.UpdateRole(Role role)
        {
            var existingRole = _context.Role.Find(role.RoleId);
            if (existingRole == null)
            {
                throw new KeyNotFoundException("Role not found");
            }

            // Update role properties
            existingRole.RoleName = role.RoleName;
            existingRole.Users = role.Users.Select(user => _context.User.Find(user.UserId)).Where(u => u != null).ToHashSet();

            _context.Entry(existingRole).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteRole(int id)
        {
            var role = _context.Role.Find(id);
            if (role == null)
            {
                throw new KeyNotFoundException("Role not found");
            }

            _context.Role.Remove(role);
            _context.SaveChanges();
        }
    }

}
