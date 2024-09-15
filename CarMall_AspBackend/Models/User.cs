using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace carManagement.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        [Column("userid")]
        public int UserId { get; set; }

        [Column("Username")]
        [Column(TypeName = "varchar(255)")]
        public string Username { get; set; }

        [Column("Password")]
        [Column(TypeName = "varchar(255)")]
        public string Password { get; set; }

        [Column("is_active")]
        public bool isactive { get; set; }
        //[Column("Email")]
        //public string Email { get; set; }

        public ICollection<Role> Roles { get; set; }
    }

}
