using Microsoft.AspNetCore.Mvc;
using Auction_Clock___SE2_Klas4_Groep6.Models;

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
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] Product product, [FromForm] IFormFile photo)
        {
            
            if (photo != null && photo.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await photo.CopyToAsync(fileStream);
                }

                
                product.AuctionDate = product.AuctionDate.Date;
            }

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return Ok(product); 
        }
    }
    
}
