using Auction_Clock___SE2_Klas4_Groep6.Models;
using AuctionClock.Api.Models.DTO_s;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Auction_Clock___SE2_Klas4_Groep6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;

        public ProductsController(AppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        // Haalt producten op uit database //
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products
                .Include(p => p.Auction)
                .ToListAsync();

            return Ok(products);
        }
        // Haalt een product op op basis van ID //
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
                return NotFound();

            return Ok(product);
        }
        // Alleen ingelogde gebruikers mogen een product aanmaken //
        [Authorize]
        [HttpPost("create-product")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateProduct([FromForm] ProductaddDTO dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                     ?? User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return BadRequest();

            dto.AuctionDate = dto.AuctionDate.Date;

            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                MinimumPrice = dto.MinimumPrice,
                AuctionDate = dto.AuctionDate,
                CompanyId = user.CompanyId,
                StartPrice = 0
            };

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }
        // Uploadt een foto bij het aanmaken van een product // 
        [HttpPost("upload-photo")]
        public async Task<IActionResult> UploadPhoto([FromQuery]int productId, IFormFile photo)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
                return NotFound("Product niet gevonden");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await photo.CopyToAsync(stream);

            product.ImagePath = $"/img/{uniqueFileName}";
            await _context.SaveChangesAsync();

            return Ok(product.ImagePath);
        }
        // Veiling tijd aanmaken voor een product door de auctioneer //
        [Authorize]
        [HttpPost("create-auction-time/{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateAuctionTime(int id, [FromForm] AuctionTimeDTO dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                      ?? User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return BadRequest();

            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            if (product == null)
                return NotFound();

            if (dto.StartPrice < product.MinimumPrice)
                return BadRequest("Startprijs mag niet lager zijn dan minimumprijs.");

            var auction = new Auction
            {
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                AuctioneerId = user.Id,
            };

            product.StartPrice = dto.StartPrice;
            product.SetAuction(auction);

            await _context.Auctions.AddAsync(auction);
            await _context.SaveChangesAsync();

            return Ok(auction);
        }
    }
}
