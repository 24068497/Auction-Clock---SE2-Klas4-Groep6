using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auction_Clock___SE2_Klas4_Groep6.Models
{
    [Table("company")] 
    public class Company
    {
        [Key] [Column("companyid")] public int? CompanyId { get; set; } = null;
        [Required]
        [MaxLength(100)]
        [Column("name")]       
        public string Name { get; set; }

        [Column("address")]   
        public string? Address { get; set; }

        [Column("kvk")]
        public string? KvK { get; set; }

        [Column("bank_account")]
        public string? BankAccount { get; set; }

      
    }
}