namespace Auction_Clock___SE2_Klas4_Groep6.Models;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Auction
{
    [Key]
    public int AuctionId { get; set; }

    [Required]
    public DateTime StartTime { get; set; }

    [Required]
    public DateTime EndTime { get; set; }

    [Required]
    public int Auctioneer { get; set; }

    [ForeignKey("Auctioneer")]
    public User User { get; set; }

    // Navigatie
    public ICollection<Product> Products { get; set; } = new List<Product>();
}