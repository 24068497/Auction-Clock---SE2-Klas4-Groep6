namespace Auction_Clock___SE2_Klas4_Groep6.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    [Key]
    public int UserId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Email { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [MaxLength(20)]
    public string TelNr { get; set; }

    [Required]
    [MaxLength(255)]
    public string Password { get; set; }
    
    [Required]
    public int RoleId { get; set; }

    public int? CompanyId { get; set; }

    // Navigatie
    public Role Role { get; set; }
    public Company Company { get; set; }
}