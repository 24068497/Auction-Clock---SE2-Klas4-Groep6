namespace Auction_Clock___SE2_Klas4_Groep6.Models;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Auctioneer
{
    [Key, ForeignKey("User")]
    public int AucId { get; set; }

    public User User { get; set; }

    // Navigatie
    public ICollection<Auction> Auctions { get; set; } = new List<Auction>();
}