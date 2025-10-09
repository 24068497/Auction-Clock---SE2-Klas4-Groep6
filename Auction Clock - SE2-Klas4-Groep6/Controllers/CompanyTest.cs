using Microsoft.AspNetCore.Mvc;
using Auction_Clock___SE2_Klas4_Groep6.Models;

namespace Auction_Clock___SE2_Klas4_Groep6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        // "Fake database"
        private static List<Company> Companies = new List<Company>
        {
            new Company { CompanyId = 1, Name = "Tech Innovations BV", Address = "Den Haag", KvK = "12345678", BankAccount = "NL12BANK0123456789" },
            new Company { CompanyId = 2, Name = "Green Energy NL", Address = "Rotterdam", KvK = "87654321", BankAccount = "NL34BANK9876543210" }
        };

        // GET: api/company
        [HttpGet]
        public ActionResult<IEnumerable<Company>> GetAll()
        {
            return Ok(Companies);
        }

        // GET: api/company/1
        [HttpGet("{id}")]
        public ActionResult<Company> GetById(int id)
        {
            var company = Companies.FirstOrDefault(c => c.CompanyId == id);
            if (company == null)
                return NotFound();
            return Ok(company);
        }

        // POST: api/company
        [HttpPost]
        public ActionResult<Company> AddCompany([FromBody] Company newCompany)
        {
            newCompany.CompanyId = Companies.Any() ? Companies.Max(c => c.CompanyId) + 1 : 1;
            Companies.Add(newCompany);
            return CreatedAtAction(nameof(GetById), new { id = newCompany.CompanyId }, newCompany);
        }

        // PUT: api/company/1
        [HttpPut("{id}")]
        public IActionResult UpdateCompany(int id, [FromBody] Company updatedCompany)
        {
            var company = Companies.FirstOrDefault(c => c.CompanyId == id);
            if (company == null)
                return NotFound();

            company.Name = updatedCompany.Name;
            company.Address = updatedCompany.Address;
            company.KvK = updatedCompany.KvK;
            company.BankAccount = updatedCompany.BankAccount;

            return NoContent();
        }

        // DELETE: api/company/1
        [HttpDelete("{id}")]
        public IActionResult DeleteCompany(int id)
        {
            var company = Companies.FirstOrDefault(c => c.CompanyId == id);
            if (company == null)
                return NotFound();

            Companies.Remove(company);
            return NoContent();
        }
    }
}
