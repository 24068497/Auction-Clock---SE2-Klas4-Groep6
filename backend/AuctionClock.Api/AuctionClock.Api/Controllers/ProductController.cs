using Microsoft.AspNetCore.Mvc;
using Auction_Clock___SE2_Klas4_Groep6.Models;
using Microsoft.EntityFrameworkCore;
using AuctionClock.Api.Models.DTO_s;

namespace Auction_Clock___SE2_Klas4_Groep6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
                return NotFound();

            return Ok(product);
        }
        [HttpPost("create-product")]
        [Consumes("multipart/form-data")]

        // POST: api/products
        public async Task<IActionResult> CreateProduct([FromForm] ProductaddDTO productaddDTO, [FromForm] IFormFile? photo)
        {
            if (photo != null && photo.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await photo.CopyToAsync(fileStream);
                }

                productaddDTO.ImagePath = $"/img/{uniqueFileName}";
            }

            productaddDTO.AuctionDate = productaddDTO.AuctionDate.Date;
            
            var product = new Product
            {
                Name = productaddDTO.Name,
                Description = productaddDTO.Description,
                StartPrice = productaddDTO.StartPrice,
                MinimumPrice = productaddDTO.MinimumPrice,
                AuctionDate = productaddDTO.AuctionDate,
                ImagePath = productaddDTO.ImagePath,
                Company = productaddDTO.Company,
            };

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }

        // POST: api/auction/addtime/{id}
        [HttpPost("create-auction-time")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateAuctionTime(int id, [FromForm] AuctionTimeDTO auctionTimeDTO)
        {
            var product = await _context.Products
                            .FirstOrDefaultAsync(p => p.ProductId == id);
            
            if (product == null)
            {
                return NotFound();
            }

            var auction = new Auction
            {
                StartTime = auctionTimeDTO.StartTime,
                EndTime = auctionTimeDTO.EndTime,
                Auctioneer = auctionTimeDTO.Auctioneer,
            };

            product.SetAuction(auction);

            await _context.Auctions.AddAsync(auction);
            await _context.SaveChangesAsync();
            return Ok(auction);
        }
    }
}