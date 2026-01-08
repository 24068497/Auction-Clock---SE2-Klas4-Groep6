using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Auction_Clock___SE2_Klas4_Groep6.Models;
 
namespace Auction_Clock___SE2_Klas4_Groep6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly AppDbContext _context;
 
        public CompanyController(AppDbContext context)
        {
            _context = context;
        }
 
        // GET: api/company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetAll()
        {
            return await _context.Companies.ToListAsync();
        }
 
        // GET: api/company/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetById(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
                return NotFound();
            return company;
        }
 
        // POST: api/company
        [HttpPost]
        public async Task<ActionResult<Company>> AddCompany([FromBody] Company newCompany)
        {
            _context.Companies.Add(newCompany);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = newCompany.CompanyId }, newCompany);
        }
 
        // PUT: api/company/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id, [FromBody] Company updatedCompany)
        {
            if (id != updatedCompany.CompanyId)
                return BadRequest();
 
            _context.Entry(updatedCompany).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
 
        // DELETE: api/company/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
                return NotFound();
 
            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}