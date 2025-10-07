namespace Auction_Clock___SE2_Klas4_Groep6.Data;

using Microsoft.EntityFrameworkCore;
using Auction_Clock___SE2_Klas4_Groep6.Models;

public class AuctionDbContext : DbContext
{
    public DbSet<Role> Roles { get; set; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Auctioneer> Auctioneers { get; set; }
    public DbSet<Auction> Auctions { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Pas deze connection string aan voor eigen omgeving
        optionsBuilder.UseSqlServer("Server=localhost;Database=AuctionDB;Trusted_Connection=True;TrustServerCertificate=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Moet gelijk aan SQL zijn
        modelBuilder.Entity<User>().ToTable("User");
        modelBuilder.Entity<Role>().ToTable("Role");
        modelBuilder.Entity<Company>().ToTable("Company");
        modelBuilder.Entity<Supplier>().ToTable("Supplier");
        modelBuilder.Entity<Customer>().ToTable("Customer");
        modelBuilder.Entity<Auctioneer>().ToTable("Auctioneer");
        modelBuilder.Entity<Auction>().ToTable("Auction");
        modelBuilder.Entity<Product>().ToTable("Product");
    }
}