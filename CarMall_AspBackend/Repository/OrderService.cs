using carManagement.Data;
using carManagement.Interface;
using carManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace carManagement.Services
{
    public class OrderService : IOrder
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        Order IOrder.PlaceOrder(int carId, int userId, int branchId, DateTime? startDate, DateTime? endDate, bool isPurchase)
        {
            var car = _context.Car.Find(carId);
            if (car == null)
            {
                throw new KeyNotFoundException("Car not found");
            }

            var inventory = _context.Inventory
                .FirstOrDefault(i => i.CarId == carId && i.BranchId == branchId);
            if (inventory == null)
            {
                throw new KeyNotFoundException("Inventory not found");
            }

            if (inventory.Quantity <= 0 && isPurchase)
            {
                throw new InvalidOperationException("Out of Stock");
            }

            OrderRequest order = new OrderRequest
            {
                CarId = carId,
                UserId = userId,
                StartDate = (DateTime)startDate,
                EndDate = (DateTime)endDate,
                IsPurchase = isPurchase
            };

            var branch = _context.Branch.Find(branchId);
            if (branch == null)
            {
                throw new KeyNotFoundException("Branch not found");
            }
            order.Branch = branch;

            double amount;
            if (isPurchase)
            {
                amount = car.PurchasePrice;
                inventory.Quantity -= 1;
            }
            else
            {
                if (!startDate.HasValue || !endDate.HasValue)
                {
                    throw new ArgumentException("Start date and end date must be provided for rentals.");
                }

                int rentalDays = (endDate.Value - startDate.Value).Days;
                if (rentalDays < 0)
                {
                    throw new ArgumentException("End date cannot be before start date.");
                }

                amount = rentalDays * car.PricePerDay;
            }

            _context.Order.Add(order);
            _context.Inventory.Update(inventory);
            _context.SaveChanges();

            var transaction = new Transaction
            {
                Order = order,
                Amount = amount,
                TransactionDate = DateTime.Now
            };
            _context.Transaction.Add(transaction);
            _context.SaveChanges();

            return order;
        }

        IEnumerable<Order> IOrder.GetAllOrders()
        {
            return _context.Order.ToList();
        }

        Order IOrder.GetOrderById(int id)
        {
            var order = _context.Order.Find(id);
            if (order == null)
            {
                throw new KeyNotFoundException("Order not found");
            }
            return order;
        }

        Order IOrder.UpdateOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                throw new ArgumentException("Order ID mismatch");
            }

            if (!_context.Order.Any(o => o.OrderId == id))
            {
                throw new KeyNotFoundException("Order not found");
            }

            _context.Entry(order).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return order;
        }

        void IOrder.DeleteOrder(int id)
        {
            var order = _context.Order.Find(id);
            if (order == null)
            {
                throw new KeyNotFoundException("Order not found");
            }

            _context.Order.Remove(order);
            _context.SaveChanges();
        }

        void IOrder.Save(OrderRequest orderRequest)
        {
            // Implement logic to save OrderRequest if needed
            throw new NotImplementedException();
        }

        bool IOrder.Exists(int id)
        {
            return _context.Order.Any(o => o.OrderId == id);
        }

        Order IOrder.Save(Order order)
        {
            throw new NotImplementedException();
        }
    }
}
