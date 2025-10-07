namespace Auction_Clock___SE2_Klas4_Groep6.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Supplier
{
    [Key, ForeignKey("User")]
    public int SupId { get; set; }

    public User User { get; set; }
}