using Microsoft.EntityFrameworkCore;
 
namespace Auction_Clock___SE2_Klas4_Groep6.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
 
        public DbSet<Company> Company { get; set; }
        // Voeg later eventueel andere tabellen toe zoals Users en Products
    }
}