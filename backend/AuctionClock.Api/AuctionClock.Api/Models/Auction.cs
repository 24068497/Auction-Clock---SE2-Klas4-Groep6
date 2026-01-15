    namespace Auction_Clock___SE2_Klas4_Groep6.Models;
    
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.Json.Serialization;

    public class Auction
    {
        [Key]
        public int AuctionId { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        public string AuctioneerId { get; set; }
        
        [ForeignKey(nameof(AuctioneerId))]
        public User Auctioneer { get; set; }

        // Navigatie //
        [JsonIgnore]
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }