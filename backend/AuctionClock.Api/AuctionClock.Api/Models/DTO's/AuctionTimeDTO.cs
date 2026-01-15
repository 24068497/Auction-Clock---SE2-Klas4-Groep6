namespace AuctionClock.Api.Models.DTO_s
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class AuctionTimeDTO
    {
        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }
        
        [Required]
        public decimal StartPrice { get; set; }
    }
}