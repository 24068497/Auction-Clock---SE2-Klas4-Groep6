using System.ComponentModel.DataAnnotations;

namespace Auction_Clock___SE2_Klas4_Groep6.Models.DTO_s
{
    public class RegisterDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress ]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        public string TelNr { get; set; }

        public string? Role { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string CompanyName { get; set; }

        [Required]
        [MaxLength(200)]
        public string CompanyAddress { get; set; }
    }

    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}