namespace Auction_Clock___SE2_Klas4_Groep6.Models;

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


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
    public decimal MinimumPrice { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime AuctionDate { get; set; }

    public int? AuctionId { get; set; }

    public int Company { get; set; }

    public int? Customer { get; set; }
    
    [JsonIgnore]
    [ForeignKey("AuctionId")]
    public Auction? Auction { get; set; }

    [JsonIgnore]
    [ForeignKey("Company")]
    public Company? CompanyNav { get; set; }

    [JsonIgnore]
    [ForeignKey("Customer")]
    public int? CustomerNav { get; set; }
    
    public string? ImagePath { get; set; }
}