using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace carManagement.Models
{
    [Table("Inventory")]
    public class Inventory
    {
        [Key]
        [Column("inventory_id")]
        public int InventoryId { get; set; }

        [ForeignKey("branch")]
        [Column("branchid")]
        public int BranchId { get; set; }

        [Column("carid")]
        public int Carid { get; set; }

        [Column("quantity")]
        public int Quantity { get;set; }

    }
}
