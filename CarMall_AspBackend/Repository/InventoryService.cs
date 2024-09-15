using carManagement.Data;
using carManagement.Interface;
using carManagement.Models;
using System.Collections.Generic;
using System.Linq;

namespace carManagement.Services
{
    public class InventoryService : IInventory
    {
        private readonly ApplicationDbContext _context;

        public InventoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Inventory> GetAllInventory()
        {
            return _context.Inventory.ToList();
        }

        public Inventory GetInventoryById(int id)
        {
            var inventory = _context.Inventory.Find(id);
            if (inventory == null)
            {
                throw new KeyNotFoundException("Inventory not found");
            }
            return inventory;
        }

        public void CreateInventory(Inventory inventory)
        {
            _context.Inventory.Add(inventory);
            _context.SaveChanges();
        }

        public void UpdateInventory(Inventory inventory)
        {
            var existingInventory = _context.Inventory.Find(inventory.InventoryId);
            if (existingInventory == null)
            {
                throw new KeyNotFoundException("Inventory not found");
            }

            // Update properties here
            existingInventory.CarId = inventory.CarId;
            existingInventory.BranchId = inventory.BranchId;
            existingInventory.Quantity = inventory.Quantity;
            // Add any other properties that need to be updated

            _context.Entry(existingInventory).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteInventory(int id)
        {
            var inventory = _context.Inventory.Find(id);
            if (inventory == null)
            {
                throw new KeyNotFoundException("Inventory not found");
            }

            _context.Inventory.Remove(inventory);
            _context.SaveChanges();
        }
    }
}
