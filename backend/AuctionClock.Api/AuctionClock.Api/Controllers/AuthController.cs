using Auction_Clock___SE2_Klas4_Groep6.Models;
using Auction_Clock___SE2_Klas4_Groep6.Models.DTO_s;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Auction_Clock___SE2_Klas4_Groep6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;

        public AuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration config,
            AppDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _config = config;
            _context = context;
        }

        // ================= REGISTER =================
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            // 1️⃣ Zoek bestaande company (naam + adres)
            var company = await _context.Companies
                .FirstOrDefaultAsync(c =>
                    c.Name == dto.CompanyName &&
                    c.Address == dto.CompanyAddress);

            // 2️⃣ Bestaat niet → nieuwe company
            if (company == null)
            {
                company = new Company
                {
                    Name = dto.CompanyName,
                    Address = dto.CompanyAddress
                };

                _context.Companies.Add(company);
                await _context.SaveChangesAsync();
            }

            // 3️⃣ Maak user + koppel company
            var user = new User
            {
                UserName = dto.Email,
                Email = dto.Email,
                Name = dto.Name,
                TelNr = dto.TelNr,
                CompanyId = company.CompanyId ?? 0
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            // 4️⃣ Rol toewijzen
            var roleToAssign = string.IsNullOrEmpty(dto.Role) ? "Koper" : dto.Role;

            if (!await _roleManager.RoleExistsAsync(roleToAssign))
                return BadRequest(new { error = $"Role {roleToAssign} does not exist." });

            await _userManager.AddToRoleAsync(user, roleToAssign);

            return Ok("User registered successfully.");
        }

        // ================= LOGIN =================
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return Unauthorized("Invalid credentials");

            var passwordValid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!passwordValid)
                return Unauthorized("Invalid credentials");

            var token = await GenerateJwtToken(user);
            return Ok(new { token });
        }

        // ================= JWT =================
        private async Task<string> GenerateJwtToken(User user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("name", user.Name),
                new Claim("companyId", user.CompanyId.ToString())
            };

            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
