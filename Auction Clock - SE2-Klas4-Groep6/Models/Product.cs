namespace Auction_Clock___SE2_Klas4_Groep6.Models;

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Product
{
    [Key]
    public int ProductId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    public string Description { get; set; }

    [Required]
    public decimal StartPrice { get; set; }

    [Required]
    public DateTime AuctionDate { get; set; }

    public int? AuctionId { get; set; }

    [Required]
    public int Company { get; set; }

    public int? Customer { get; set; }

    // Navigatie
    [ForeignKey("AuctionId")]
    public Auction Auction { get; set; }

    [ForeignKey("Company")]
    public Company CompanyNav { get; set; }

    [ForeignKey("Customer")]
    public User CustomerNav { get; set; }
}