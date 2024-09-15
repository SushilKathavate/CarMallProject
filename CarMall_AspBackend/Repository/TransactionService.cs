using carManagement.Data;
using carManagement.Interface;
using carManagement.Models;
using System.Collections.Generic;
using System.Linq;

namespace carManagement.Services
{
    public class TransactionService : ITransaction
    {
        private readonly ApplicationDbContext _context;

        public TransactionService(ApplicationDbContext context)
        {
            _context = context;
        }

        IEnumerable<Transaction> ITransaction.GetAllTransactions()
        {
            return _context.Transaction.ToList();
        }

        Transaction ITransaction.GetTransactionById(int id)
        {
            var transaction = _context.Transaction.Find(id);
            if (transaction == null)
            {
                throw new KeyNotFoundException("Transaction not found");
            }
            return transaction;
        }

        void ITransaction.CreateTransaction(Transaction transaction)
        {
            _context.Transaction.Add(transaction);
            _context.SaveChanges();
        }

        void ITransaction.Save(Transaction transaction)
        {
            var existingTransaction = _context.Transaction.Find(transaction.TransactionId);
            if (existingTransaction == null)
            {
                throw new KeyNotFoundException("Transaction not found");
            }

            _context.Entry(transaction).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
