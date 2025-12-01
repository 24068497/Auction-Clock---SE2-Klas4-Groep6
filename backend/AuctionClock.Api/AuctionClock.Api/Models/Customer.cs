namespace Auction_Clock___SE2_Klas4_Groep6.Models;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Customer
{
    [Key, ForeignKey("User")]
    public int CusId { get; set; }

    public User User { get; set; }

    // Navigatie
    public ICollection<Product> Products { get; set; } = new List<Product>();
}