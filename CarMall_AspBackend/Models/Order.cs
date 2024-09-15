using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace carManagement.Models
{

    [Table("order_table")]
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("orderid")]
        public int OrderId { get; set; }

        [Column("carid")]
        public int CarId { get; set; }

        [Column("userid")]
        public int UserId { get; set; }

        [Column("start_date")]
        public DateTime StartDate { get; set; }

        [Column("end_date")]
        public DateTime EndDate { get; set; }

        [Column("is_sold")]
        public bool IsPurchase { get; set; }

        [ForeignKey("Branch")]
        [Column("branchid")]
        public int BranchId { get; set; }

        public virtual Branch Branch { get; set; }
    }
    ////public class Order
    //{
    //    [Key]
    //    [Column("orderid")]
    //    public int OrderId { get; set; }

    //    [Column("Date")]
    //    public DateTime Date { get; set; }

    //    [Column("OrderType")]
    //    public string OrderType { get; set; }

    //    [ForeignKey("Car")]
    //    [Column("CarId")]
    //    public int CarId { get; set; }

    //    [ForeignKey("User")]
    //    [Column("UserId")]
    //    public int UserId { get; set; }

    //    public Car Car { get; set; }
    //    public User User { get; set; }

    //    public static implicit operator Order(OrderRequest v)
    //    {
    //        throw new NotImplementedException();
    //    }
    //}
}
