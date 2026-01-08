using Auction_Clock___SE2_Klas4_Groep6.Models;
using Auction_Clock___SE2_Klas4_Groep6.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Auction_Clock___SE2_Klas4_Groep6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BidsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/bids/{productId} -> Plaats een bod
        [HttpPost("{productId}")]
        public async Task<IActionResult> PlaatsBod(int productId, [FromBody] BidDTO bidDto)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
                return NotFound("Product niet gevonden");

            var bid = new BidHistory
            {
                ProductId = productId,
                Verkoper = bidDto.Verkoper,
                Price = bidDto.Price
            };

            _context.BidHistories.Add(bid);
            await _context.SaveChangesAsync();

            return Ok(bid);
        }

        // GET: api/bids/price-history/{productId} -> Haal prijshistorie op
        [HttpGet("price-history/{productId}")]
        public async Task<IActionResult> HaalPrijshistorieOp(int productId)
        {
            var bids = await _context.BidHistories
                .Where(b => b.ProductId == productId)
                .ToListAsync();

            if (!bids.Any())
                return Ok(new PriceHistoryDTO());

            var overallAverage = bids.Average(b => b.Price);

            var last10 = bids
                .OrderByDescending(b => b.CreatedAt)
                .Take(10)
                .Select(b => b.Price)
                .ToList();

            var byVerkoper = bids
                .GroupBy(b => b.Verkoper)
                .Select(g => new VerkoperHistory
                {
                    Verkoper = g.Key,
                    AveragePrice = g.Average(x => x.Price),
                    Last10Prices = g
                        .OrderByDescending(x => x.CreatedAt)
                        .Take(10)
                        .Select(x => x.Price)
                        .ToList()
                })
                .ToList();

            var result = new PriceHistoryDTO
            {
                OverallAverage = overallAverage,
                Last10 = last10,
                ByVerkoper = byVerkoper
            };

            return Ok(result);
        }
    }
}
