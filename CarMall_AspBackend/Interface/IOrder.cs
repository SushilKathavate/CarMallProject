using carManagement.Models;

namespace carManagement.Interface
{
    public interface IOrder
    {
        Order PlaceOrder(int carId, int userId, int branchId, DateTime? startDate, DateTime? endDate, bool isPurchase);
        IEnumerable<Order> GetAllOrders();
        Order GetOrderById(int id);
        Order UpdateOrder(int id, Order order);
        void DeleteOrder(int id);
        void Save(OrderRequest order);
        bool Exists(int id);
        Order Save(Order order);
    }
}
