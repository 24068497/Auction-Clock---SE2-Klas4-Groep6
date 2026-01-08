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
        public async Task<IActionResult> CreateProduct([FromForm] ProductaddDTO productaddDTO)
        {

            productaddDTO.AuctionDate = productaddDTO.AuctionDate.Date;

            var product = new Product
            {
                Name = productaddDTO.Name,
                Description = productaddDTO.Description,
                StartPrice = productaddDTO.StartPrice,
                MinimumPrice = productaddDTO.MinimumPrice,
                AuctionDate = productaddDTO.AuctionDate,
                Company = productaddDTO.Company,
            };

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }

        [HttpPost("upload-photo")]
        public async Task<IActionResult> UploadPhoto(int productId, IFormFile photo)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
                return NotFound("Product niet gevonden");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            product.ImagePath = $"/img/{uniqueFileName}";
            await _context.SaveChangesAsync();

            return Ok(product.ImagePath);
        }

        //POST: api/auction/addtime/{id}
        [Authorize]
        [HttpPost("create-auction-time/{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateAuctionTime(int id, [FromForm] AuctionTimeDTO auctionTimeDTO)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                         ?? User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;


            if (userId == null)
            {
                return Unauthorized();
            }
            else
            {
                var user = await _userManager.FindByIdAsync(userId);

                var product = await _context.Products
                                    .FirstOrDefaultAsync(p => p.ProductId == id);

                if (product == null)
                {
                    return NotFound();
                }
                if (user == null)
                {
                    return BadRequest();
                }
                else
                {
                    var auction = new Auction
                    {
                        StartTime = auctionTimeDTO.StartTime,
                        EndTime = auctionTimeDTO.EndTime,
                        AuctioneerId = user.Id,
                    };

                    product.SetAuction(auction);

                    await _context.Auctions.AddAsync(auction);
                    await _context.SaveChangesAsync();
                    return Ok(auction);
                }
            }
        }
    }
}