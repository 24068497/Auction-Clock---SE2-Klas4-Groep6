namespace Auction_Clock___SE2_Klas4_Groep6.Models;

using System;
using System.ComponentModel.DataAnnotations;


public class ProductaddDTO
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    public string Description { get; set; }
    
    [Required]
    public decimal  MinimumPrice { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime AuctionDate { get; set; }

    public int Company { get; set; }

    public string? ImagePath { get; set; }
}