using Auction_Clock___SE2_Klas4_Groep6.Models;
using Auction_Clock___SE2_Klas4_Groep6.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

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

        // POST: api/bids/{productId}
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
                Price = bidDto.Price,
                CreatedAt = DateTime.UtcNow
            };

            _context.BidHistories.Add(bid);
            await _context.SaveChangesAsync();

            return Ok(bid);
        }

        // GET: api/bids/price-history/{productId}
        [HttpGet("price-history/{productId}")]
        public async Task<IActionResult> HaalPrijshistorieOp(int productId)
        {
            var result = new PriceHistoryDTO();

            using (var connection = _context.Database.GetDbConnection())
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "GetPriceHistory";
                    command.CommandType = CommandType.StoredProcedure;

                    var param = command.CreateParameter();
                    param.ParameterName = "@ProductId";
                    param.Value = productId;
                    command.Parameters.Add(param);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        // Gemiddelde
                        if (await reader.ReadAsync())
                        {
                            result.OverallAverage = reader.IsDBNull(0)
                                ? 0
                                : reader.GetDecimal(0);
                        }

                        // Laatste 10 prijzen
                        if (await reader.NextResultAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                result.Last10.Add(reader.GetDecimal(0));
                            }
                        }

                        // Gemiddelde per verkoper
                        if (await reader.NextResultAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                result.ByVerkoper.Add(new VerkoperHistory
                                {
                                    Verkoper = reader.GetString(0),
                                    AveragePrice = reader.GetDecimal(1)
                                });
                            }
                        }
                    }
                }
            }

            return Ok(result);
        }
    }
}
