using carManagement.Models;

namespace carManagement.Interface
{
    public interface IInventory
    {
        IEnumerable<Inventory> GetAllInventory();
        Inventory GetInventoryById(int id);
        void CreateInventory(Inventory inventory);
        void UpdateInventory(Inventory inventory);

        void DeleteInventory(int id);
    }
}
