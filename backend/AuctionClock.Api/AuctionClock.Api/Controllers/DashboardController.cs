using AuctionClockAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Auction_Clock___SE2_Klas4_Groep6.Models;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    public DashboardController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }
    // Haalt de gebruiker + rol op // 
    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {
        var user = await _userManager.GetUserAsync(User);
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new DashboardUserDto
        {
            Email = user.Email,
            Role = roles.First(),
            CompanyId = user.CompanyId
        });
    }
}