using System.Collections.Generic;

namespace Auction_Clock___SE2_Klas4_Groep6.Models.DTOs
{
    public class PriceHistoryDTO
    {
        public decimal OverallAverage { get; set; }
        public List<decimal> Last10 { get; set; } = new List<decimal>();
        public List<VerkoperHistory> ByVerkoper { get; set; } = new List<VerkoperHistory>();
    }

    public class VerkoperHistory
    {
        public string Verkoper { get; set; } = string.Empty;
        public decimal AveragePrice { get; set; }
        public List<decimal> Last10Prices { get; set; } = new List<decimal>();
    }
}