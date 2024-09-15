using carManagement.Data;
using carManagement.Interface;
using carManagement.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace carManagement.Services
{
    public class UserService : IUser
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAllUsers()
        {
            // Fetch all users with their roles
            return _context.User
                .Include(u => u.Roles)
                .ToList();
        }

        public User GetUserById(int id)
        {
            // Fetch a user by ID with their roles
            var user = _context.User
                .Include(u => u.Roles)
                .FirstOrDefault(u => u.UserId == id);

            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            return user;
        }

        public void CreateUser(User user)
        {
            // Validate and fetch roles
            var roles = new HashSet<Role>();
            foreach (var role in user.Roles)
            {
                var existingRole = _context.Role.Find(role.RoleId);
                if (existingRole != null)
                {
                    roles.Add(existingRole);
                }
            }

            user.Roles = roles;
            _context.User.Add(user);
            _context.SaveChanges();
        }

        public void UpdateUser(User user)
        {
            var existingUser = _context.User
                .Include(u => u.Roles)
                .FirstOrDefault(u => u.UserId == user.UserId);

            if (existingUser == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            // Update user properties
            existingUser.Username = user.Username;
            existingUser.Password = user.Password;
            existingUser.Email = user.Email;

            // Update roles
            var roles = new HashSet<Role>();
            foreach (var role in user.Roles)
            {
                var existingRole = _context.Role.Find(role.RoleId);
                if (existingRole != null)
                {
                    roles.Add(existingRole);
                }
            }

            existingUser.Roles = roles;

            _context.Entry(existingUser).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            var user = _context.User.Find(id);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            _context.User.Remove(user);
            _context.SaveChanges();
        
    }
}


}
