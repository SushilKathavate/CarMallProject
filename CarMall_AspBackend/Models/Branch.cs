using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace carManagement.Models
{
    [Table("Branch")]
    public class Branch
    {
        [Key]
        [Column("branchid")]
        public int BranchId { get; set; }

        [Column("branch_name")]
        [Column(TypeName = "varchar(255)")]
        public string BranchName { get; set; }

        [Column("location")]
        [Column(TypeName = "varchar(255)")]
        public string Location { get; set; }

        public ICollection<Inventory> Inventories { get; set; }
    }
}
