namespace Auction_Clock___SE2_Klas4_Groep6.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Role
{
    [Key]
    public int RoleId { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; }

    // Navigatie
    public ICollection<User> Users { get; set; } = new List<User>();
}