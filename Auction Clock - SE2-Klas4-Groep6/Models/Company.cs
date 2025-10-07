namespace Auction_Clock___SE2_Klas4_Groep6.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Company
{
    [Key]
    public int CompanyId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    public string Address { get; set; }
    public string KvK { get; set; }
    public string BankAccount { get; set; }

    // Navigatie
    public ICollection<User> Users { get; set; } = new List<User>();
    public ICollection<Product> Products { get; set; } = new List<Product>();
}