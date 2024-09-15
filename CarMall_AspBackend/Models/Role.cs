using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace carManagement.Models
{
    [Table("Role")]
    public class Role
    {
        [Key]
        [Column("roleid")]
        public int RoleId { get; set; }

        [Column("role_name")]
        [Column(TypeName = "varchar(255)")]
        public string RoleName { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
