namespace Auction_Clock___SE2_Klas4_Groep6.Models.DTO_s
{
    public class RegisterDto
    {
        public string Name { get; set; }
        public string Email { get; set; } // toegevoegd
        public string Password { get; set; } // toegevoegd
        public string TelNr { get; set; }
        public string? Role { get; set; }
    }

    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}