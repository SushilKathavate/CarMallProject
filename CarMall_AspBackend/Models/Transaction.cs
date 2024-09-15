using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace carManagement.Models
{
    [Table("transaction")]
    public class Transaction
    {
        [Key]
        [Column("transactionid")]
        public int TransactionId { get; set; }

        [ForeignKey("orderid")]
        [Column("orderid")]
        public int OrderId { get; set; }

        [Column("amount")]
        public double Amount { get; set; }

        [Column("transaction_date")]
        public DateTime TransactionDate { get; set; }

        public Order Order { get; set; }
    }
}
