using carManagement.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace carManagement.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Branch>()
        //        .Property(b => b.BranchName)
        //        .HasColumnName("branch_name")
        //        .HasColumnType("varchar(255)")
        //        .IsRequired();

        //    modelBuilder.Entity<Branch>()
        //        .Property(b => b.Location)
        //        .HasColumnName("location")
        //        .HasColumnType("varchar(255)")
        //        .IsRequired();
        //}

        public DbSet<Car> Car { get; set; }
        public DbSet<Branch> Branch { get; set; }
        public DbSet<Inventory> Inventory { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Transaction> Transaction { get; set; }
        public DbSet<User> User { get; set; }

        internal void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}
