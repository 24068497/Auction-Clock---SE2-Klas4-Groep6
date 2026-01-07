namespace Auction_Clock___SE2_Klas4_Groep6.Models;

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User : IdentityUser
{
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
    [MaxLength(20)]
    public string TelNr { get; set; }
}