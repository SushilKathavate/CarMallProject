using carManagement.Models;
namespace carManagement.Interface
{
    public interface ITransaction
    {
        IEnumerable<Transaction> GetAllTransactions();
        Transaction GetTransactionById(int id);
        void CreateTransaction(Transaction transaction);
        void Save(Transaction transaction);
    }
}
