using carManagement.Models;

namespace carManagement.Interface
{
    public interface IUser
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int id);
        void CreateUser(User user);
        void UpdateUser(User user);
        
        void DeleteUser(int id);
    }
}
