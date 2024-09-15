using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace carManagement.Models
{
    [Table("Car")]
    public class Car
    {
        [Key]
        [Column("carid")]
        public int CarId { get; set; }

        [Column("model")]
        [Column(TypeName = "varchar(255)")]
        public string Model { get; set; }

        [Column("brand")]
        [Column(TypeName = "varchar(255)")]
        public string Brand { get; set; }

        [Column("price_per_day")]
        public double PricePerDay { get; set; }

        [Column("purchase_price")]
        public double PurchasePrice { get; set; }

        [Column("available")]
        public bool IsAvailable { get; set; }
    }
}
